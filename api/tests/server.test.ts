import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("example", () => {
    assertEquals("world", "world");
    assertEquals({ hello: "world" }, { hello: "world" });
});