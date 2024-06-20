

import frappe
from frappe.model.document import Document

class DMS(Document):
    @frappe.whitelist()
    def on_submit(self, new_status="Pending"):
        self.status = new_status
        self.save()

    @frappe.whitelist()
    def approve(self):
        self.status = "Approved"
        self.save()

    @frappe.whitelist()
    def reject(self):
        self.status = "Rejected"
        self.save()

@frappe.whitelist()
def get_document_details(doc_id):
    try:
        # Fetch document details
        doc = frappe.get_doc("DMS", doc_id)
        return doc.as_dict()
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Failed to fetch document details")
        return None

@frappe.whitelist()
def get_user_mail_id(user=None):
    try:
        # Get the email of the user based on the user ID
        email = frappe.db.get_value("User", user, "email")
        # Fetch Employee ID and name based on the User ID
        employee_details = frappe.db.get_value("Employee", {"user_id": user}, ["name", "employee_name", "designation"], as_dict=True)
        
        if employee_details:
            return {
                "email": email,
                "employee_id": employee_details.get("name"),
                "employee_name": employee_details.get("employee_name"),
                "designation": employee_details.get("designation")
            }
        else:
            return {
                "email": email,
                "employee_id": None,
                "employee_name": None,
                "designation": None
            }
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Failed to fetch user details")
        return None



