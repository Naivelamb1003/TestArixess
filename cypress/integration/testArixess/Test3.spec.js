/// <reference types="cypress" />
import { createVerify } from "crypto";
import "cypress-file-upload";

context("Send documents", () => {
  // it("should login", () => {
  //   cy.visit("https://dev.2sign.online/login");

  //   cy.get("[type=email]")
  //     .type("qwertyu@qaz.com")
  //     .should("have.value", "qwertyu@qaz.com");

  //   cy.get("[type=password]")
  //     .type("qwertyu@qaz.com")
  //     .should("have.value", "qwertyu@qaz.com");

  //   cy.get("[type=submit]").click();
  // });

  it("should send document", () => {
    cy.visit("https://dev.2sign.online");

    cy.get("[name=recipientName]")
      .type("Test Test")
      .should("have.value", "Test Test");

    cy.get("[name=senderName]")
      .type("Test1 Test1")
      .should("have.value", "Test1 Test1");

    cy.get("[name=recipientEmail]")
      .type("qa-test@arixess.com")
      .should("have.value", "qa-test@arixess.com");

    cy.get("[name=senderEmail]")
      .type("qwertyu@qaz.com")
      .should("have.value", "qwertyu@qaz.com");

    const filepath = "../fixtures/file_example.pdf";
    cy.get('input[type="file"]').attachFile(filepath);

    cy.get(".MuiButton-fullWidth").click();

    cy.wait(5000); //TODO wait until page finish loading

    const dataTransfer = new DataTransfer();
    cy.get(".DraggableButton_btnWrap__1zzqX")
      .first()
      .trigger("dragstart", { dataTransfer });

    cy.get(".DocumentConstructor_configuratorBody__DT38i")
      .first()
      .trigger("drop", { dataTransfer });

    cy.get("[name=name]").type("Sign");
    cy.get("[role=button]").last().click();
    cy.get("[type=text]").type("MySign");
    cy.get("[type=button]").click(); //fill info and send
    cy.get("[type=button]").click(); //review and send document
  });

  it("should check email", () => {
    cy.visit("https://159.89.29.216:8000/webmail/?_task=mail&_mbox=INBOX");
    cy.get("#rcmloginuser")
      .type("qa-test@arixess.com")
      .should("have.value", "qa-test@arixess.com");

    cy.get("#rcmloginpwd").type("catch123").should("have.value", "catch123");

    cy.get("#rcmloginsubmit").click();

    cy.wait(2500);

    cy.get("#rcmbtn111").click();

    const message = cy
      .get("#messagelist")
      .find("tbody tr")
      .should("have.class", "unread");

    message
      .find(".subject a")
      .first()
      .should("have.text", "Sign document from Test Test")
      .dblclick();
  });
});
