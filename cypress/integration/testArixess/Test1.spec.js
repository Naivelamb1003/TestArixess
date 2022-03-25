/// <reference types="cypress" />

context("MailCheck", () => {
  it("should login", () => {
    cy.visit("https://159.89.29.216:8000/webmail/?_task=mail&_mbox=INBOX");

    cy.get("#rcmloginuser")
      .type("qa-test@arixess.com")
      .should("have.value", "qa-test@arixess.com");

    cy.get("#rcmloginpwd").type("catch123").should("have.value", "catch123");

    cy.get("#rcmloginsubmit").click();

    cy.wait(2500);

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

    cy.wait(10000);

    cy.get('a[href*="./?_task=mail&_mbox=Sent"]').click();

    cy.wait(2500);

    cy.get("#messagelist")
      .find("tbody tr")
      .find(".subject a")
      .first()
      .should("have.text", date)
      .click();

    cy.wait(2500);

    cy.get("#rcmbtn111").click();

    cy.get("#messagelist")
      .find("tbody tr")
      .find(".subject a")
      .last()
      .should("not.have.text", date);
  });
});
