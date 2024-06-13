


frappe.ui.form.on('Movement of Original Document', {
    onload: function(frm) {
        // Set date_of_movement to today's date
        frm.set_value('date_of_movement', frappe.datetime.nowdate());

        // Fetch current user's email and employee ID
        frappe.call({
            method: "ppcrc_app.document_management.doctype.movement_of_original_document.movement_of_original_document.get_user_mail_id",
            args: { user: frappe.session.user },
            callback: function(response) {
                if (response.message) {
                    console.log("User email: ", response.message.email);
                    if (frm.doc.__islocal) {
                        // Set document_receiver only if the document is new
                        frm.set_value('document_receiver', response.message.employee_id);
                    }
                } else {
                    frappe.msgprint("User details not found.");
                }
            },
            error: function(err) {
                frappe.msgprint("Error fetching user details: " + err);
            }
        });

        // Fetch document details if document ID is present
        if (frm.doc.dms) {
            frappe.call({
                method: "ppcrc_app.document_management.doctype.dms.dms.get_document_details",
                args: { doc_id: frm.doc.dms},
                callback: function(response) {
                    if (response.message) {
                        frm.set_value('document_name', response.message.document_name);
                        frm.set_value('document_number', response.message.document_number);
                        frm.set_value('default_custodian', response.message.custodian_of_original_document);
                        frm.set_value('custodian_email', response.message.default_custodian_email);
                    } else {
                        frappe.msgprint("Document details not found.");
                    }
                },
                error: function(err) {
                    frappe.msgprint("Error fetching document details: " + err);
                }
            });
        }

        if (frm.is_new()) {
            frm.set_intro('Create New Movement of Original Document Doctype');
        }
    },

    on_submit: function(frm) {
        // Set status to 'Pending For Approver' after form is submitted
        frm.set_value('status', 'Pending');
        frm.save_or_update();
    },

    refresh: function(frm) {
        // Remove existing custom buttons if necessary
        frm.remove_custom_button(__('Approve'));
        frm.remove_custom_button(__('Reject'));

        let default_custodian_email = frm.doc.default_custodian_email;
        console.log("default Custodian data:", default_custodian_email);
        console.log('frappe session user:', frappe.session.user);
        console.log(frm.selected_doc);
        console.log("Frm owner:", frm.selected_doc.owner);

        if (frm.doc.status === 'Pending' && frappe.session.user === default_custodian_email) {
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

        if (frm.doc.status === 'Approved' && frappe.session.user === frm.selected_doc.owner) {
            // Add Received button
            frm.add_custom_button(__('Received'), function() {
                frm.call('received').then(() => {
                    frm.reload_doc();
                    frm.save();
                });
            }, __("Action"));
        }

        if (frm.doc.status === 'Received' && frappe.session.user === default_custodian_email) {
            // Add Received button
            frm.add_custom_button(__('Returned'), function() {
                frm.call('received_back').then(() => {
                    frm.reload_doc();
                    frm.save();
                });
            }, __("Action"));
        }
    }
});