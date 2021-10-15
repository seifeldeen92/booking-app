/// <reference types="cypress" />

describe("Calender", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display calenders for 3 companies", () => {
    cy.get(".calenderGrid").children().should("have.length", 3);
  });

  it("can book a time slot in company 1 on Monday 08:30 AM (Slot 2)", () => {
    cy.get("#calender_0 > .calenderListForMonday .slot-2 button")
      .click()
      .then((btn) => {
        btn.contents("Remove booking");
      });

    cy.get(".middle > :nth-child(1) > :nth-child(2)")
      .children(".positive")
      .should("contain", "Monday 08:30 AM - 10:00 AM")
      .and("be.visible");
  });

  it("can unbook a time slot in company 1 on Monday 08:30 AM (Slot 2)", () => {
    cy.get("#calender_0 > .calenderListForMonday .slot-2 button").click();
    cy.get("#calender_0 > .calenderListForMonday .slot-2 button")
      .click()
      .then((btn) => {
        btn.contents("Book this slot");
      });

    cy.get(".middle > :nth-child(1) > :nth-child(2) > .positive").should(
      "not.exist"
    );
  });

  it("can't book time slot 10 on Tuesday in companies 2&3 because it is booked already for company 1", () => {
    cy.get("#calender_0 > .calenderListForTuesday .slot-10 button").click();

    cy.get("#calender_1 > .calenderListForTuesday .slot-10 button").should(
      "be.disabled"
    );
    cy.get("#calender_2 > .calenderListForTuesday .slot-10 button").should(
      "be.disabled"
    );
  });
});
