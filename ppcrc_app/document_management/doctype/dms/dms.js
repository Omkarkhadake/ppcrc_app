
// frappe.ui.form.on("DMS", {
//     onload: function(frm) {
//         if (frm.is_new()) {
//             // Set date_of_movement to today's date
//             frm.set_value('document_creation_date', frappe.datetime.nowdate());

//             // Fetch the user's email ID and employee ID
//             frappe.call({
//                 method: "ppcrc_app.document_management.doctype.dms.dms.get_user_mail_id",
//                 args: {
//                     user: frappe.session.user
//                 },
//                 callback: function(response) {
//                     if (response.message) {
//                         console.log("Email ID: ", response.message.email);
//                         console.log("Employee ID: ", response.message.employee_id);
//                         console.log("Employee Name: ", response.message.employee_name);
//                         console.log("Employee designation: ", response.message.designation);

//                         frm.set_value('employee', response.message.employee_id);
//                         frm.set_value('email_id', response.message.email);
//                         frm.set_value('employee_name', response.message.employee_name);
//                         frm.set_value('designation', response.message.designation);
//                     } else {
//                         console.log("Email ID not found or error occurred.");
//                     }
//                 },
//                 error: function(xhr, status, error) {
//                     console.error("Error fetching user's email ID:", error);
//                 }
//             });
//         }
//     },

    

//     on_submit: function(frm) {
//         frm.set_value('status', 'Pending');
//         frm.save_or_update();
//     },

//     refresh: function(frm) {
//         console.log("frm.doc.selected_doc.approving_authority_id", frm.doc.approving_authority_id);

//         if (frm.doc.status === 'Pending' && frappe.session.user === frm.doc.approving_authority_id) {
//             // Add Approve and Reject buttons
//             frm.add_custom_button(__('Approve'), function() {
//                 frm.call('approve').then(() => {
//                     frm.reload_doc();
//                     frm.save();
//                 });
//             }, __("Action"));

//             frm.add_custom_button(__('Reject'), function() {
//                 frm.call('reject').then(() => {
//                     frm.reload_doc();
//                     frm.save();
//                 });
//             }, __("Action"));
//         }

//         // Show the button only when document_status is Submitted
//         if (frm.doc.docstatus === 1 && frm.doc.status == "Approved") {
//             frm.add_custom_button(__("Request for this document"), function() {
//                 // Get the ID of the current document
//                 const documentId = frm.doc.name;

//                 // Make sure the document ID is not empty
//                 if (documentId) {
//                     // Call server-side method to fetch document details
//                     frappe.call({
//                         method: "ppcrc_app.document_management.doctype.dms.dms.get_document_details",
//                         args: {
//                             doc_id: documentId
//                         },
//                         callback: function(response) {
//                             if (response.message) {
//                                 console.log("Document Details:", response.message);
//                                 // Create a new "Movement of Original Document" and set values
//                                 frappe.model.with_doctype('Movement of Original Document', function() {
//                                     var doc = frappe.model.get_new_doc('Movement of Original Document');
//                                     doc.document_name = response.message.document_name;
//                                     doc.document_number = response.message.document_number;
//                                     doc.default_custodian = response.message.custodian_of_original_document;
//                                     doc.default_custodian_email = response.message.custodian_email;

//                                     // Set other fields as needed
//                                     frappe.set_route("Form", "Movement of Original Document", doc.name);
//                                 });
//                             } else {
//                                 frappe.msgprint("Document not found or error occurred.");
//                             }
//                         },
//                         error: function(xhr, status, error) {
//                             console.error("Error fetching document details:", error);
//                             frappe.msgprint("Error fetching document details. Please try again.");
//                         }
//                     });

//                     // Call server-side method to fetch user's email ID and employee ID
//                     frappe.call({
//                         method: "ppcrc_app.document_management.doctype.dms.dms.get_user_mail_id",
//                         args: {
//                             user: frappe.session.user
//                         },
//                         callback: function(response) {
//                             if (response.message) {
//                                 console.log("Email ID:", response.message.email);
//                                 console.log("Employee ID:", response.message.employee_id);
//                             } else {
//                                 console.log("Email ID not found or error occurred.");
//                             }
//                         },
//                         error: function(xhr, status, error) {
//                             console.error("Error fetching user's email ID:", error);
//                         }
//                     });
//                 } else {
//                     frappe.msgprint("Document ID is empty.");
//                 }
//             });
//         }
//     }
// });






// frappe.ui.form.on("DMS", {
//     onload: function(frm) {
//         if (frm.is_new()) {
//             // Set date_of_movement to today's date
//             frm.set_value('document_creation_date', frappe.datetime.nowdate());

//             // Fetch the user's email ID and employee ID
//             frappe.call({
//                 method: "ppcrc_app.document_management.doctype.dms.dms.get_user_mail_id",
//                 args: {
//                     user: frappe.session.user
//                 },
//                 callback: function(response) {
//                     if (response.message) {
//                         console.log("Email ID: ", response.message.email);
//                         console.log("Employee ID: ", response.message.employee_id);
//                         console.log("Employee Name: ", response.message.employee_name);
//                         console.log("Employee designation: ", response.message.designation);

//                         frm.set_value('employee', response.message.employee_id);
//                         frm.set_value('email_id', response.message.email);
//                         frm.set_value('employee_name', response.message.employee_name);
//                         frm.set_value('designation', response.message.designation);
//                     } else {
//                         console.log("Email ID not found or error occurred.");
//                     }
//                 },
//                 error: function(xhr, status, error) {
//                     console.error("Error fetching user's email ID:", error);
//                 }
//             });
//         }
//     },
//     refresh:function(frm){
//         frm.set_query('document_sub_categories',(doc) => {
//             return{
//                 filters:{
//                     "document_categories":frm.doc.document_categories
//                 }
//             }
//         })
//     },
//     refresh: function(frm) {
//         // Disable delete button for 'document_version_list' table for non-System Managers
//         if (!frappe.user.has_role('System Manager')) {
//             frm.fields_dict['document_version_list'].grid.wrapper.find('.grid-remove-rows').hide();
//         }

//         // Check if the user is the approving authority and the status is 'Pending'
//         if (frm.doc.status === 'Pending' && frappe.session.user === frm.doc.approving_authority_id) {
//             // Add Approve and Reject buttons
//             frm.add_custom_button(__('Approve'), function() {
//                 frm.call('approve').then(() => {
//                     frm.reload_doc();
//                     frm.save();
//                 });
//             }, __("Action"));

//             frm.add_custom_button(__('Reject'), function() {
//                 frm.call('reject').then(() => {
//                     frm.reload_doc();
//                     frm.save();
//                 });
//             }, __("Action"));
//         }

//         // Show the "Request for this document" button only when document_status is Submitted and Approved
//         if (frm.doc.docstatus === 1 && frm.doc.status == "Approved") {
//             frm.add_custom_button(__("Request for this document"), function() {
//                 // Get the ID of the current document
//                 const documentId = frm.doc.name;

//                 if (documentId) {
//                     // Call server-side method to fetch document details
//                     frappe.call({
//                         method: "ppcrc_app.document_management.doctype.dms.dms.get_document_details",
//                         args: { doc_id: documentId },
//                         callback: function(response) {
//                             if (response.message) {
//                                 console.log("Document Details:", response.message);
//                                 // Create a new "Movement of Original Document" and set values
//                                 frappe.model.with_doctype('Movement of Original Document', function() {
//                                     var doc = frappe.model.get_new_doc('Movement of Original Document');
//                                     doc.document_name = response.message.document_name;
//                                     doc.document_number = response.message.document_number;
//                                     doc.default_custodian = response.message.custodian_of_original_document;
//                                     doc.default_custodian_email = response.message.custodian_email;
//                                     // Set other fields as needed
//                                     frappe.set_route("Form", "Movement of Original Document", doc.name);
//                                 });
//                             } else {
//                                 frappe.msgprint("Document not found or error occurred.");
//                             }
//                         },
//                         error: function(xhr, status, error) {
//                             console.error("Error fetching document details:", error);
//                             frappe.msgprint("Error fetching document details. Please try again.");
//                         }
//                     });

//                     // Fetch user's email ID and employee ID
//                     frappe.call({
//                         method: "ppcrc_app.document_management.doctype.dms.dms.get_user_mail_id",
//                         args: { user: frappe.session.user },
//                         callback: function(response) {
//                             if (response.message) {
//                                 console.log("Email ID:", response.message.email);
//                                 console.log("Employee ID:", response.message.employee_id);
//                             } else {
//                                 console.log("Email ID not found or error occurred.");
//                             }
//                         },
//                         error: function(xhr, status, error) {
//                             console.error("Error fetching user's email ID:", error);
//                         }
//                     });
//                 } else {
//                     frappe.msgprint("Document ID is empty.");
//                 }
//             });
//         }
//     },
//     on_submit: function(frm) {
//         frm.set_value('status', 'Pending');
//         frm.save_or_update();
//     }
// });







frappe.ui.form.on("DMS", {
    onload: function(frm) {
        if (frm.is_new()) {
            // Set date_of_movement to today's date
            frm.set_value('document_creation_date', frappe.datetime.nowdate());

            // Fetch the user's email ID and employee ID
            frappe.call({
                method: "ppcrc_app.document_management.doctype.dms.dms.get_user_mail_id",
                args: {
                    user: frappe.session.user
                },
                callback: function(response) {
                    if (response.message) {
                        console.log("Email ID: ", response.message.email);
                        console.log("Employee ID: ", response.message.employee_id);
                        console.log("Employee Name: ", response.message.employee_name);
                        console.log("Employee designation: ", response.message.designation);

                        frm.set_value('employee', response.message.employee_id);
                        frm.set_value('email_id', response.message.email);
                        frm.set_value('employee_name', response.message.employee_name);
                        frm.set_value('designation', response.message.designation);
                    } else {
                        console.log("Email ID not found or error occurred.");
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error fetching user's email ID:", error);
                }
            });
        }
    },
    refresh: function(frm) {
        // Set query for document_sub_categories based on document_categories
        frm.set_query('document_sub_categories', (doc) => {
            return {
                filters: {
                    "document_categories": doc.document_categories
                }
            }
        });

        // Disable delete button for 'document_version_list' table for non-System Managers
        if (!frappe.user.has_role('System Manager')) {
            frm.fields_dict['document_version_list'].grid.wrapper.find('.grid-remove-rows').hide();
        }

        // Check if the user is the approving authority and the status is 'Pending'
        if (frm.doc.status === 'Pending' && frappe.session.user === frm.doc.approving_authority_id) {
            // Add Approve and Reject buttons
            frm.add_custom_button(__('Approve'), function() {
                frm.call('approve').then(() => {
                    frm.reload_doc();
                    frm.save();
                });
            }, __("Action"));

            frm.add_custom_button(__('Reject'), function() {
                frm.call('reject').then(() => {
                    frm.reload_doc();
                    frm.save();
                });
            }, __("Action"));
        }

        // Show the "Request for this document" button only when document_status is Submitted and Approved
        if (frm.doc.docstatus === 1 && frm.doc.status == "Approved") {
            frm.add_custom_button(__("Request for this document"), function() {
                // Get the ID of the current document
                const documentId = frm.doc.name;

                if (documentId) {
                    // Call server-side method to fetch document details
                    frappe.call({
                        method: "ppcrc_app.document_management.doctype.dms.dms.get_document_details",
                        args: { doc_id: documentId },
                        callback: function(response) {
                            if (response.message) {
                                console.log("Document Details:", response.message);
                                // Create a new "Movement of Original Document" and set values
                                frappe.model.with_doctype('Movement of Original Document', function() {
                                    var doc = frappe.model.get_new_doc('Movement of Original Document');
                                    doc.document_name = response.message.document_name;
                                    doc.document_number = response.message.document_number;
                                    doc.default_custodian = response.message.custodian_of_original_document;
                                    doc.default_custodian_email = response.message.custodian_email;
                                    // Set other fields as needed
                                    frappe.set_route("Form", "Movement of Original Document", doc.name);
                                });
                            } else {
                                frappe.msgprint("Document not found or error occurred.");
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error("Error fetching document details:", error);
                            frappe.msgprint("Error fetching document details. Please try again.");
                        }
                    });

                    // Fetch user's email ID and employee ID
                    frappe.call({
                        method: "ppcrc_app.document_management.doctype.dms.dms.get_user_mail_id",
                        args: { user: frappe.session.user },
                        callback: function(response) {
                            if (response.message) {
                                console.log("Email ID:", response.message.email);
                                console.log("Employee ID:", response.message.employee_id);
                            } else {
                                console.log("Email ID not found or error occurred.");
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error("Error fetching user's email ID:", error);
                        }
                    });
                } else {
                    frappe.msgprint("Document ID is empty.");
                }
            });
        }
    },
    on_submit: function(frm) {
        frm.set_value('status', 'Pending');
        frm.save_or_update();
    }
});
