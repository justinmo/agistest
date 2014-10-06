/**
 * <pre>
 * 
 *  Accela GIS
 *  getMapTest.js
 * 
 *  Accela, Inc.
 *  Copyright (C): 2014
 * 
 *  Description:
 * 
 *  Note
 *  Created By: Iron Tang
 *
 * <Date>       <Who>       <What>
 * 5/2/2014     Iron Tang    init
 *
 * </pre>
 */

describe("A suite", function () {
    it("contains spec with an expectation", function () {
        expect(true).toBe(true);
    });
});

describe("A suite is just a function", function () {
    var a;

    it("and so is a spec", function () {
        a = true;

        expect(a).toBe(true);
    });
});

describe("The 'toBe' matcher compares with ===", function() {

    it("and has a positive case", function() {
        expect(true).toBe(true);
    });
    it("and can have a negative case", function () {
        expect(false).not.toBe(true);
    });
});