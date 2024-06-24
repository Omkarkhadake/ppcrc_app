import frappe
from frappe.model.document import Document
import re
from frappe import _

class Publication(Document):
    @frappe.whitelist()
    def validate(self):
        # Validate and format the title
        if self.get("title"):
            self.set("title", str(self.get("title")).upper())

    #     # Validate and format the page_numbers
    #     if self.get("page_numbers"):
    #         page_numbers = str(self.get("page_numbers")).strip()
    #         # Regular expression to ensure the format is a sequence of digits and hyphens
    #         match = re.match(r"^(\d{1,2})(-\d{1,2})*$", page_numbers)
    #         if match:
    #             formatted_page_numbers = self.format_number_with_hyphens(page_numbers, 2)
    #             self.set("page_numbers", formatted_page_numbers)
    #         else:
    #             frappe.throw(_("Page numbers must be in the format xx-xx, xx-xx-x, xx-xx-xx, etc."))

    #     # Validate and format the impact_factor
    #     if self.get("impact_factor"):
    #         impact_factor = str(self.get("impact_factor")).strip()
    #         # Regular expression to ensure the format is a sequence of digits and hyphens
    #         match = re.match(r"^(\d{1,2})(-\d{1,2})*$", impact_factor)
    #         if match:
    #             formatted_impact_factor = self.format_number_with_hyphens(impact_factor, 2)
    #             self.set("impact_factor", formatted_impact_factor)
    #         else:
    #             frappe.throw(_("Impact factor must be in the format xx-xx, xx-xx-x, xx-xx-xx, etc."))

    #     # Validate and format the iisn_isbn
    #     if self.get("iisn_isbn"):
    #         iisn_isbn = str(self.get("iisn_isbn")).strip()
    #         # Regular expression to match any sequence of digits separated by hyphens
    #         match = re.match(r"^(\d{4})(-\d{4})*(-\d+)*$", iisn_isbn)
    #         if match:
    #             formatted_iisn_isbn = self.format_number_with_hyphens(iisn_isbn, 4)
    #             self.set("iisn_isbn", formatted_iisn_isbn)
    #         else:
    #             frappe.throw(_("IISN/ISBN must be in the format xxxx-xxxx, xxxx-xxxx-x, xxxx-xxxx-xx, etc."))

    # def format_number_with_hyphens(self, number, group_size):
    #     """
    #     Format a string of digits so that a hyphen is inserted after every specified group of digits.
    #     """
    #     number = number.replace("-", "")  # Remove existing hyphens
    #     parts = [number[i:i+group_size] for i in range(0, len(number), group_size)]
    #     return "-".join(parts)

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

    # @frappe.whitelist()
    # def cancel(self):
    #     self.status = "Cancelled"
    #     self.save()

# my_custom_app/notifications.py
@frappe.whitelist()
def notify_users(users, message, subject):
    print("Users to notify:", users)
    for user in users:
        print("Sending notification to:", user)
        frappe.publish_realtime(event='notification', message={
            'message': message,
            'subject': subject,
            'user': user
        }, user=user)
    return "Notifications sent successfully."

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
