/// <reference types="cypress" />

context("should check mail", () => {
  it("UnreatChekboksFuctionality", () => {
    cy.visit("https://159.89.29.216:8000/webmail/?_task=mail&_mbox=INBOX");

    cy.get("#rcmloginuser")
      .type("qa-test@arixess.com")
      .should("have.value", "qa-test@arixess.com");

    cy.get("#rcmloginpwd").type("catch123").should("have.value", "catch123");
    cy.get("#rcmloginsubmit").click();

    cy.wait(2700);

    cy.get('a[href*="./?_task=mail&_action=compose"]').click();

    cy.get("#_to")
      .type("qa-test@arixess.com")
      .should("have.value", "qa-test@arixess.com");

    const date = Date.now();
    cy.get("#compose-subject").type(date).should("have.value", date);

    cy.get("#composebody")
      .type("Test Malik")
      .should("have.value", "Test Malik");

    cy.get("#rcmbtn107").click();

    cy.wait(2500);

    cy.get("#messagelist").find("tbody tr").first().click();

    cy.get("#markmessagemenulink").click();
    cy.get("#rcmbtn124").click();

    cy.get("#messagelist").find("tbody tr").should("have.class", "unread");

    cy.get("#markmessagemenulink").click();
    cy.get("#rcmbtn123").click();

    cy.get("#messagelist")
      .find("tbody tr")
      .first()
      .should("not.have.class", "unread");
  });
});
