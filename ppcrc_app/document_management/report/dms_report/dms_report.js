// Copyright (c) 2024, ppcrc and contributors
// For license information, please see license.txt

frappe.query_reports["DMS Report"] = {
	"filters": [
		{
            "fieldname": "entity_name",
            "label": __("Entity Name"),
            "fieldtype": "Link",
            "options": "Company"
        },
		{
            "fieldname": "government_bodies_and_regulators",
            "label": __("Government Bodies and Regulators"),
            "fieldtype": "Link",
            "options": "Government Bodies and Regulators"
        },
		{
            "fieldname": "document_categories",
            "label": __("Document Categories"),
            "fieldtype": "Link",
            "options": "Document Categories"
        },
		{
            "fieldname": "document_sub_categories",
            "label": __("Document Sub-Categories"),
            "fieldtype": "Link",
            "options": "Document Sub-Categories"
        },
		{
            "fieldname": "document_name",
            "label": __("Document Name"),
            "fieldtype": "Link",
            "options": "Document Name"
        },
		{
            "fieldname": "document_types",
            "label": __("Document Types"),
            "fieldtype": "Link",
            "options": "Document Types"
        },
		{
            "fieldname": "status",
            "label": __("Doctype Status"),
            "fieldtype": "Select",
            "options": "\nDraft\nPending\nApproved\nRejected"
        },
		{
            "fieldname": "document_status",
            "label": __("Document Status"),
            "fieldtype": "Select",
            "options": "\nDraft\nPending\nFinal"
        },
		{
            "fieldname": "document_access_profile",
            "label": __("Document Access Profile"),
            "fieldtype": "Select",
            "options": "\nConfidential\nPublic\nPrivate\nGeneral"
        },
		{
            "fieldname": "document_version",
            "label": __("Document Version"),
            "fieldtype": "Link",
            "options": "Document Version"
        },
		{
            "fieldname": "fiscal_year",
            "label": __("Fiscal Year"),
            "fieldtype": "Link",
            "options": "Fiscal Year"
        },
		{
            "fieldname": "document_creation_date",
            "label": __("Document Creation Date"),
            "fieldtype": "DateRange"
        },

	]
};
