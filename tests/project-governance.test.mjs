import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

// Mechanical checks for the process in docs/adr/0001-process-and-delivery-conventions.md and the licence rules in
// docs/adr/0003-agpl-compliance.md. They read files only: no database, no network.

const ROOT = new URL("..", import.meta.url).pathname;
const read = (path) => readFileSync(join(ROOT, path), "utf8");
const BASELINE_SHA = "c13cbb575ff75c1c32725935658265cf2c632a0b";
const STATUS_PATTERN = /^(Proposed|Accepted|Rejected|Superseded by ADR-\d{4})$/;

function readAdrs() {
	return readdirSync(join(ROOT, "docs/adr"))
		.filter((name) => /^\d{4}-.+\.md$/.test(name))
		.sort()
		.map((file) => {
			const text = read(`docs/adr/${file}`);
			return {
				file,
				number: file.slice(0, 4),
				status: text.match(/^- Status: (.+)$/m)?.[1]?.trim(),
				date: text.match(/^- Date: (\d{4}-\d{2}-\d{2})$/m)?.[1],
				title: text.match(/^# ADR-(\d{4}): .+$/m)?.[1],
			};
		});
}

test("the licence is the AGPL-3.0 and package.json says so", () => {
	assert.match(read("LICENSE"), /GNU AFFERO GENERAL PUBLIC LICENSE\s+Version 3/);
	assert.equal(JSON.parse(read("package.json")).license, "AGPL-3.0-only");
});

test("NOTICE.md credits the original author and names upstream", () => {
	const notice = read("NOTICE.md");
	assert.match(notice, /Marc Lou/);
	assert.match(notice, /GNU Affero General Public License v3\.0/);
	assert.ok(notice.includes("https://github.com/marclou/mailcheap"), "NOTICE.md names the original repository");
});

test("the pinned baseline commit is the same in every record of it", () => {
	for (const path of ["NOTICE.md", "docs/upstream/BASELINE.md", "docs/upstream/DIVERGENCE.md"]) {
		assert.ok(read(path).includes(BASELINE_SHA), `${path} names the baseline commit`);
	}
});

test("every ADR has a number matching its file name, a valid status and a date", () => {
	const adrs = readAdrs();
	assert.ok(adrs.length > 0, "there are ADRs");
	for (const adr of adrs) {
		assert.equal(adr.title, adr.number, `${adr.file}: the title's number matches the file name`);
		assert.match(adr.status ?? "", STATUS_PATTERN, `${adr.file}: status is one of the allowed values`);
		assert.ok(adr.date, `${adr.file}: has a "- Date: YYYY-MM-DD" line`);
	}
});

test("ADR numbers are unique and run from 0001 without gaps", () => {
	const numbers = readAdrs().map((adr) => Number(adr.number));
	assert.deepEqual(
		numbers,
		numbers.map((_, index) => index + 1)
	);
});

test("the ADR index lists every ADR with the status the file carries", () => {
	const index = read("docs/adr/README.md");
	for (const adr of readAdrs()) {
		const row = index.split("\n").find((line) => line.includes(`(${adr.file})`));
		assert.ok(row, `${adr.file} is listed in docs/adr/README.md`);
		const status = row.split("|").map((cell) => cell.trim())[3];
		assert.equal(status, adr.status, `${adr.file}: the index status matches the file`);
	}
});

test("a Superseded ADR names an ADR that exists", () => {
	const numbers = new Set(readAdrs().map((adr) => adr.number));
	for (const adr of readAdrs()) {
		const target = adr.status?.match(/^Superseded by ADR-(\d{4})$/)?.[1];
		if (target) assert.ok(numbers.has(target), `${adr.file} points at ADR-${target}`);
	}
});

test("the CHANGELOG has an Unreleased section and at least one semantic version", () => {
	const changelog = read("CHANGELOG.md");
	assert.match(changelog, /^## \[Unreleased\]$/m);
	assert.match(changelog, /^## \[\d+\.\d+\.\d+\] - \d{4}-\d{2}-\d{2}$/m);
});

test("the sprint documents exist", () => {
	for (const path of ["docs/CURRENT_SPRINT.md", "docs/ROADMAP.md", "docs/sprints", "docs/bdd", "docs/upstream/SYNC.md", "docs/upstream/DIVERGENCE.md"]) {
		assert.ok(existsSync(join(ROOT, path)), `${path} exists`);
	}
});

// ADR-0005: upstream's README stays untouched at the root so that its frequent edits never conflict, and this
// project's README is the one GitHub prefers, in .github.
test("this project's README is in .github and upstream's README has not been moved aside", () => {
	assert.ok(existsSync(join(ROOT, ".github/README.md")), ".github/README.md exists");
	assert.ok(existsSync(join(ROOT, "README.md")), "upstream's README.md is still at the root");
	assert.ok(!existsSync(join(ROOT, "docs/upstream/README.md")), "upstream's README has not been moved to docs/upstream");
});

// ADR-0001: a delivery has one version, and the sprint file says which.
test("the sprint document names the newest version in the CHANGELOG", () => {
	const newest = read("CHANGELOG.md").match(/^## \[(\d+\.\d+\.\d+)\] - /m)?.[1];
	assert.ok(newest, "the CHANGELOG has a version");
	assert.match(read("docs/CURRENT_SPRINT.md"), new RegExp(`^- Delivery version: v${newest.replaceAll(".", "\\.")}$`, "m"));
});
