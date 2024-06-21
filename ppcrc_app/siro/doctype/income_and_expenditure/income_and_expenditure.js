// Copyright (c) 2024, ppcrc and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Income and Expenditure", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on("Income and Expenditure", {
    refresh: function(frm) {
        // Calculate total income
        var total_income = 0;

        // List of fields to sum
        var fields_to_sum = ["projects_related", "testing", "grants", "donation", "foreign_contribution", "others"];

        // Sum the values of the specified fields
        fields_to_sum.forEach(function(field) {
            if (frm.doc[field]) {
                total_income += parseFloat(frm.doc[field]) || 0;
            }
        });

        // Set the total income field value
        frm.set_value("total_income_in_lakhs", total_income);
        frm.refresh_field("total_income_in_lakhs");
    }
});
