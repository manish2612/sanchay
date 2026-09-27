# ERP Second Brain: Functional Knowledge Base

This directory (`docs/brain/`) serves as the "Second Brain" for the ERP project. It is meant to store the **functional and domain knowledge** of the product, separating the *business rules* from the *technical implementation*.

As we build this accounting SaaS step-by-step, this directory will grow. The AI agent (specifically using the `erp-consultant` skill) will continuously read these documents to understand what we've built, and update them when we finalize new features.

## Structure

We will organize the brain into logical domain areas as we expand. Below is the planned structure:

- **Core Accounting**: Chart of Accounts, General Ledger, Journal Entries, Financial Periods.
- **Accounts Payable (AP)**: Vendors, Purchase Orders, Bills, Payments.
- **Accounts Receivable (AR)**: Customers, Quotes, Invoices, Receipts.
- **Inventory**: Items, Warehouses, Stock Movements, Costing Methods.
- **Banking & Reconciliation**: Bank Accounts, Transactions, Matching Rules.
- **Reporting**: Trial Balance, Profit & Loss, Balance Sheet, Tax Reports.
- **Administration & Security**: User Roles, Segregation of Duties, Approval Workflows, Audit Logs.

## How to use this Brain
1. **Discuss**: Pitch a new feature to the AI. Trigger the `erp-consultant` skill.
2. **Consult**: The AI will review these docs and provide industry-standard feedback and edge cases.
3. **Document**: Once the business logic is agreed upon, the AI will update or create a document in this folder.
4. **Build**: Technical implementation begins, strictly adhering to the scenarios defined in the Brain.
