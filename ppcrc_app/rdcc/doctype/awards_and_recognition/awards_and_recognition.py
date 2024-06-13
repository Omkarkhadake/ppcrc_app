
import frappe
from frappe.model.document import Document

class AwardsandRecognition(Document):
    @frappe.whitelist()    
    def validate(self):
        if self.get("award_title"):
            self.set("award_title", str(self.get("award_title")).upper())


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
        

import frappe

@frappe.whitelist()
def get_instructor_program_details():
    current_user = frappe.session.user
    query = """
        SELECT
            i.employee,
            i.custom_user_id,
            i.custom_program,
            p.custom_head_of_department,
            p.custom_portfolio_coordinator,
            p.custom_head_of_department_user_id,
            p.custom_portfolio_coordinator_user_id
        FROM
            `tabInstructor` i
        JOIN
            `tabProgram` p
        ON
            i.custom_program = p.program_name
        WHERE
            i.custom_user_id = %s;
    """
    results = frappe.db.sql(query, current_user, as_dict=True)
    return results


