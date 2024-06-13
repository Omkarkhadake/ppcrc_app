frappe.ui.form.on('Publication', {
    onload: function(frm) {
        console.log("running.........");
        if (frm.is_new()) {
            frm.set_intro('Create New Publication');
        }
    },
    on_submit: function(frm) {
        frm.set_value('status', 'Pending');
        frm.save_or_update();
    },
    refresh: function(frm) {
        // Remove existing custom buttons
        frm.remove_custom_button(__('Approve'));
        frm.remove_custom_button(__('Reject'));

        // Check if the document status is 'Pending'
        if (frm.doc.status === 'Pending') {
            // Call get_instructor_program_details to get the necessary details
            frappe.call({
                method: "ppcrc_app.rdcc.doctype.publication.publication.get_instructor_program_details",
                callback: function(response) {
                    if (response.message) {
                        console.log("response: ", response.message);
                        console.log("current user: ", frappe.session.user);

                        // Check if the current user matches the head of department or portfolio coordinator
                        let userIsAuthorized = response.message.some(item => 
                            frappe.session.user === item.custom_head_of_department_user_id || 
                            frappe.session.user === item.custom_portfolio_coordinator_user_id
                        );

                        // If the user is authorized, add Approve and Reject buttons
                        if (userIsAuthorized) {
                            frm.add_custom_button(__('Approve'), function() { 
                                frm.call('approve').then(() => {
                                    frappe.msgprint(`${frm.doc.employee_id}-${frm.doc.instructor} ${frm.doc.publication} Approved`);
                                    frm.reload_doc();                                   
                                    frm.save();
                                });
                            }, __("Action"));
                            
                            frm.add_custom_button(__('Reject'), function() {
                                frm.call('reject').then(() => {
                                    frappe.msgprint(`${frm.doc.employee_id}-${frm.doc.instructor} ${frm.doc.publication} Rejected`);
                                    frm.reload_doc();                                    
                                    frm.save();
                                });
                            }, __("Action"));
                        }
                    }
                }
            });
        }
    },
    after_cancel: function(frm) {
        frm.set_value('status', 'Cancelled');
        frm.save_or_update();
    },
});









// frappe.ui.form.on('Publication', {
//     refresh: function(frm) {
//         // Check if the document status is 'Pending'
//         if (frm.doc.status === 'Pending') {
//             // Call get_instructor_program_details to get the necessary details
//             frappe.call({
//                 method: "ppcrc_app.rdcc.doctype.publication.publication.get_instructor_program_details",
//                 callback: function(response) {
//                     if (response.message) {
//                         console.log("response: ", response.message);
//                         console.log("current user: ", frappe.session.user);

//                         // Check if the current user matches the head of department or portfolio coordinator
//                         let userIsAuthorized = response.message.some(item => 
//                             frappe.session.user === item.custom_head_of_department_user_id || 
//                             frappe.session.user === item.custom_portfolio_coordinator_user_id
//                         );

//                         // If the user is authorized, add Approve and Reject buttons
//                         if (userIsAuthorized) {
//                             // Add custom notification
//                             frappe.call({
//                                 method: "ppcrc_app.rdcc.doctype.publication.publication.notify_users",
//                                 args: {
//                                     users: [
//                                         response.message[0].custom_head_of_department_user_id,
//                                         response.message[0].custom_portfolio_coordinator_user_id
//                                     ],
//                                     message: `Publication ${frm.doc.publication} needs approval.`,
//                                     subject: "Publication Approval Required"
//                                 },
//                                 callback: function(response) {
//                                     console.log("Notification sent: ", response.message);
//                                 }
//                             });

//                             frm.add_custom_button(__('Approve'), function() { 
//                                 frm.call('approve').then(() => {
//                                     frappe.msgprint(`${frm.doc.employee_id}-${frm.doc.instructor} ${frm.doc.publication} Approved`);
//                                     frm.reload_doc();                                   
//                                     frm.save();
//                                 });
//                             }, __("Action"));
                            
//                             frm.add_custom_button(__('Reject'), function() {
//                                 frm.call('reject').then(() => {
//                                     frappe.msgprint(`${frm.doc.employee_id}-${frm.doc.instructor} ${frm.doc.publication} Rejected`);
//                                     frm.reload_doc();                                    
//                                     frm.save();
//                                 });
//                             }, __("Action"));
//                         }
//                     }
//                 }
//             });
//         }
//     },
// });
