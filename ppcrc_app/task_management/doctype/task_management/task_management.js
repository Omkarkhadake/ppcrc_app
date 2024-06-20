// frappe.ui.form.on("Task Management", {
//     refresh(frm) {
//         frm.set_query('task_category', function(doc) {
//             return {
//                 filters: {
//                     Regulating: doc.regulating_authority
//                 }
//             }
//         });

//         frm.set_query('task_sub_category', function(doc) {
//             // Retrieve all task categories from the child table
//             let task_categories = doc.task_category_table.map(row => row.task_category);

//             return {
//                 filters: {
//                     name: ["in", task_categories]
//                 }
//             };
//         });
//     }
// });




// Copyright (c) 2024, ppcrc and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Task Management", {
// 	refresh(frm) {

// 	},
// });