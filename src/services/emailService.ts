/**
 * Email Service
 * Handles sending emails for teacher registration and document submissions
 * Uses /api/send-email (Brevo/Sendinblue on the server)
 */

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: string; // base64 encoded
    contentType: string;
  }>;
}

class EmailService {
  private static readonly LOGO_URL =
    'https://res.cloudinary.com/dicfqwlfq/image/upload/v1764505259/VR_Robotics_Logo_upscaled_1_rrrrn8.png';
  private static readonly ADMIN_EMAIL =
    ((import.meta as any)?.env?.PUBLIC_ADMIN_EMAIL as string) ||
    ((import.meta as any)?.env?.VITE_ADMIN_EMAIL as string) || 'abhinavneeraj.bade@gmail.com';
  private static readonly API_ENDPOINT = '/api/send-email';

  /**
   * Send teacher registration email with documents
   */
  static async sendTeacherRegistrationEmail(
    teacherData: {
      fullName: string;
      email: string;
      phoneNumber?: string;
      documents: Array<{
        name: string;
        content: string; // base64
        type: string;
      }>;
    }
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      console.log('[EmailService] Preparing teacher registration email for:', teacherData.email);

      // Build HTML email content
      const htmlContent = this.buildTeacherRegistrationHTML(teacherData);

      // Prepare attachments
      const attachments = teacherData.documents.map(doc => ({
        filename: doc.name,
        content: doc.content,
        contentType: doc.type,
      }));

      // Send email to admin
      const payload: EmailPayload = {
        to: this.ADMIN_EMAIL,
        subject: `New Teacher Registration: ${teacherData.fullName}`,
        html: htmlContent,
        attachments,
      };

      console.log('[EmailService] Sending email to admin:', this.ADMIN_EMAIL);
      console.log('[EmailService] Email payload:', {
        to: payload.to,
        subject: payload.subject,
        attachmentCount: attachments.length,
      });

      // For now, we'll simulate the email sending
      // In production, you would use a real email service like Resend, SendGrid, etc.
      return this.simulateEmailSend(payload);
    } catch (error) {
      console.error('[EmailService] Error sending email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }

  /**
   * Build HTML content for teacher registration email
   */
  private static buildTeacherRegistrationHTML(teacherData: {
    fullName: string;
    email: string;
    phoneNumber?: string;
    documents: Array<{ name: string }>;
  }): string {
    const documentList = teacherData.documents
      .map(doc => `<li>${doc.name}</li>`)
      .join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #FF6A00; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #FF6A00; }
            .documents { background-color: #fff; padding: 15px; border-radius: 6px; border-left: 4px solid #FF6A00; }
            .documents h3 { margin-top: 0; color: #FF6A00; }
            .documents ul { margin: 10px 0; padding-left: 20px; }
            .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Teacher Registration</h1>
              <p>A new teacher has submitted their registration with documents for review.</p>
            </div>
            
            <div class="content">
              <div class="field">
                <span class="label">Full Name:</span> ${teacherData.fullName}
              </div>
              <div class="field">
                <span class="label">Email:</span> ${teacherData.email}
              </div>
              ${teacherData.phoneNumber ? `
              <div class="field">
                <span class="label">Phone Number:</span> ${teacherData.phoneNumber}
              </div>
              ` : ''}
            </div>

            <div class="documents">
              <h3>📎 Submitted Documents</h3>
              <ul>
                ${documentList}
              </ul>
              <p style="font-size: 12px; color: #666; margin-top: 10px;">
                All documents are attached to this email for your review.
              </p>
            </div>

            <div class="footer">
              <p>VR Robotics Academy - Teacher Registration System</p>
              <p>This is an automated email. Please do not reply directly to this address.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  /**
   * Send email via backend email API endpoint
   */
  private static async sendEmailViaGmail(payload: EmailPayload): Promise<{
    success: boolean;
    messageId?: string;
    error?: string;
  }> {
    try {
      console.log('[EmailService] ===== EMAIL SEND ATTEMPT =====');
      console.log('[EmailService] To:', payload.to);
      console.log('[EmailService] Subject:', payload.subject);
      console.log('[EmailService] Calling API endpoint:', this.API_ENDPOINT);

      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: payload.to,
          subject: payload.subject,
          html: payload.html,
          attachments: payload.attachments || [],
        }),
      });

      console.log('[EmailService] Response status:', response.status);

      const data = await response.json();

      if (!response.ok) {
        console.error('[EmailService] ✗ Error from API:', data);
        return {
          success: false,
          error: data.error || 'Failed to send email',
        };
      }

      console.log('[EmailService] ✓✓✓ Email sent successfully!');
      console.log('[EmailService] Message ID:', data.messageId);
      console.log('[EmailService] ===== EMAIL SEND SUCCESS =====');

      return {
        success: true,
        messageId: data.messageId,
      };
    } catch (error) {
      console.error('[EmailService] ✗✗✗ ERROR sending email:', error);
      console.error('[EmailService] Error type:', error instanceof Error ? error.message : 'Unknown');
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Simulate email sending with delay (fallback for development/testing)
   */
  private static async simulateEmailSendWithDelay(payload: EmailPayload): Promise<{
    success: boolean;
    messageId?: string;
    error?: string;
  }> {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        console.log('[EmailService] ✓ Email sent successfully (SIMULATED)');
        console.log('[EmailService] Email details:', {
          to: payload.to,
          subject: payload.subject,
          attachments: payload.attachments?.length || 0,
        });

        resolve({
          success: true,
          messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        });
      }, 1000);
    });
  }

  /**
   * Main method to send emails (routes to appropriate service)
   */
  private static async simulateEmailSend(payload: EmailPayload): Promise<{
    success: boolean;
    messageId?: string;
    error?: string;
  }> {
    return this.sendEmailViaGmail(payload);
  }

  /**
   * Send confirmation email to teacher
   */
  static async sendTeacherConfirmationEmail(
    teacherEmail: string,
    teacherName: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #FF6A00; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
              .content { background-color: #f9f9f9; padding: 20px; border-radius: 8px; }
              .message { font-size: 16px; line-height: 1.6; }
              .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Registration Received</h1>
              </div>
              
              <div class="content">
                <p class="message">
                  Dear ${teacherName},<br><br>
                  Thank you for submitting your teacher registration with VR Robotics Academy!<br><br>
                  <strong>Your documents have been received and are under review.</strong><br><br>
                  We will review your credentials and documents, and you can expect to hear from us within <strong>24 hours</strong>.<br><br>
                  If you have any questions in the meantime, please don't hesitate to contact us.<br><br>
                  Best regards,<br>
                  VR Robotics Academy Team
                </p>
              </div>

              <div class="footer">
                <p>VR Robotics Academy - Teacher Registration System</p>
              </div>
            </div>
          </body>
        </html>
      `;

      const payload: EmailPayload = {
        to: teacherEmail,
        subject: 'Registration Received - VR Robotics Academy',
        html: htmlContent,
      };

      return this.simulateEmailSend(payload);
    } catch (error) {
      console.error('[EmailService] Error sending confirmation email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send confirmation email',
      };
    }
  }

  /**
   * Send demo booking notification email to admin
   */
  static async sendDemoBookingEmail(demoData: {
    parentName: string;
    parentEmail: string;
    parentPhone: string;
    childName: string;
    childAge: number;
    preferredDate: string;
    preferredTime: string;
    interests?: string;
    message?: string;
    teacherId?: string;
  }): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      console.log('[EmailService] Preparing demo booking email for admin');

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; color: #f5f5f5; background: #0b0b0b; }
              .container { max-width: 700px; margin: 0 auto; padding: 20px; }
              .header { background-color: #FF6A00; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
              .header h1 { margin: 0; font-size: 24px; }
              .content { background-color: #141414; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #2a2a2a; }
              .field { margin-bottom: 15px; padding: 12px; background-color: #1b1b1b; border-left: 4px solid #FF6A00; border-radius: 4px; }
              .label { font-weight: bold; color: #ff8c42; display: block; margin-bottom: 5px; }
              .value { color: #f5f5f5; }
              .section-title { font-weight: bold; color: #1b1b1b; margin-top: 20px; margin-bottom: 10px; font-size: 16px; background:#d4af37; padding:10px 12px; border-radius:6px; }
              .footer { text-align: center; color: #b8b8b8; font-size: 12px; margin-top: 20px; border-top: 1px solid #2a2a2a; padding-top: 10px; }
              a { color: #f5f5f5; }
            </style>
          </head>
          <body>
            <div class="container">
              <div style="text-align:center; margin-bottom: 14px;">
                <img src="${this.LOGO_URL}" alt="VR Robotics Academy" width="68" height="68" style="display:inline-block; border-radius:50%; border:2px solid #d4af37; background:#111;" />
              </div>
              <div class="header">
                <h1>🎉 New Demo Booking Request</h1>
                <p>A new student has booked a demo session!</p>
              </div>
              
              <div class="content">
                <div class="section-title">Parent/Guardian Information</div>
                <div class="field">
                  <span class="label">Name:</span>
                  <span class="value">${demoData.parentName}</span>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <span class="value"><a href="mailto:${demoData.parentEmail}">${demoData.parentEmail}</a></span>
                </div>
                <div class="field">
                  <span class="label">Phone:</span>
                  <span class="value"><a href="tel:${demoData.parentPhone}">${demoData.parentPhone}</a></span>
                </div>

                <div class="section-title">Student Information</div>
                <div class="field">
                  <span class="label">Child's Name:</span>
                  <span class="value">${demoData.childName}</span>
                </div>
                <div class="field">
                  <span class="label">Child's Age:</span>
                  <span class="value">${demoData.childAge} years</span>
                </div>
                ${demoData.interests ? `
                <div class="field">
                  <span class="label">Interests:</span>
                  <span class="value">${demoData.interests}</span>
                </div>
                ` : ''}

                <div class="section-title">Demo Session Details</div>
                <div class="field">
                  <span class="label">Preferred Date:</span>
                  <span class="value">${new Date(demoData.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="field">
                  <span class="label">Preferred Time:</span>
                  <span class="value">${this.formatTimeSlot(demoData.preferredTime)}</span>
                </div>
                ${demoData.message ? `
                <div class="field">
                  <span class="label">Additional Message:</span>
                  <span class="value">${demoData.message}</span>
                </div>
                ` : ''}

                <div style="background-color: #d4af37; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #FF6A00;">
                  <p style="margin: 0; color: #1b1b1b;"><strong>Next Steps:</strong> Review this booking and contact the parent to confirm the demo session.</p>
                </div>
              </div>

              <div class="footer">
                <p>VR Robotics Academy - Demo Booking System</p>
                <p>This is an automated email. Please do not reply directly to this address.</p>
              </div>
            </div>
          </body>
        </html>
      `;

      const payload: EmailPayload = {
        to: this.ADMIN_EMAIL,
        subject: `🎉 New Demo Booking: ${demoData.childName} - ${demoData.preferredDate}`,
        html: htmlContent,
      };

      console.log('[EmailService] Sending demo booking email to admin:', this.ADMIN_EMAIL);
      return this.simulateEmailSend(payload);
    } catch (error) {
      console.error('[EmailService] Error sending demo booking email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send demo booking email',
      };
    }
  }

  static async sendDemoBookingNotifications(demoData: {
    parentName: string;
    parentEmail: string;
    parentPhone: string;
    childName: string;
    childAge: number;
    preferredDate: string;
    preferredTime: string;
    interests?: string;
    message?: string;
    paymentId?: string;
  }): Promise<void> {
    const adminResult = await this.sendDemoBookingEmail(demoData);
    if (!adminResult.success) {
      throw new Error(adminResult.error || 'Failed to send demo booking email to admin');
    }

    const parentHtml = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; background:#0b0b0b; color:#f5f5f5; line-height: 1.6; padding:20px;">
          <div style="max-width:700px;margin:0 auto;background:#141414;border:1px solid #2a2a2a;border-radius:10px;overflow:hidden;">
            <div style="text-align:center; padding:16px 18px 0;">
              <img src="${this.LOGO_URL}" alt="VR Robotics Academy" width="64" height="64" style="display:inline-block; border-radius:50%; border:2px solid #d4af37; background:#111;" />
            </div>
            <div style="background:#ff6a00;color:#fff;padding:14px 18px;font-size:24px;font-weight:700;">Demo Booking Confirmed</div>
            <div style="padding:14px 18px;color:#b8b8b8;">Dear ${demoData.parentName},</div>
            <div style="padding:0 18px 10px;"><div style="background:#d4af37;color:#1b1b1b;padding:10px 12px;border-radius:6px;font-weight:700;">Your Booking Details</div></div>
            <div style="padding:0 18px 18px;">
              <div style="background:#1b1b1b;border-left:4px solid #ff6a00;padding:10px;border-radius:6px;margin-bottom:10px;"><strong style="color:#ff8c42;">Child:</strong> ${demoData.childName}</div>
              <div style="background:#1b1b1b;border-left:4px solid #ff6a00;padding:10px;border-radius:6px;margin-bottom:10px;"><strong style="color:#ff8c42;">Preferred Date:</strong> ${demoData.preferredDate}</div>
              <div style="background:#1b1b1b;border-left:4px solid #ff6a00;padding:10px;border-radius:6px;margin-bottom:10px;"><strong style="color:#ff8c42;">Preferred Time:</strong> ${this.formatTimeSlot(demoData.preferredTime)}</div>
              ${demoData.paymentId ? `<div style="background:#1b1b1b;border-left:4px solid #ff6a00;padding:10px;border-radius:6px;"><strong style="color:#ff8c42;">Payment ID:</strong> ${demoData.paymentId}</div>` : ''}
            </div>
            <div style="padding:0 18px 18px;color:#b8b8b8;">Our team will get in touch within the next 24 hours to confirm your slot.</div>
          </div>
        </body>
      </html>
    `;

    const parentResult = await this.simulateEmailSend({
      to: demoData.parentEmail,
      subject: 'Demo Booking Confirmed - VR Robotics Academy',
      html: parentHtml,
    });
    if (!parentResult.success) {
      throw new Error(parentResult.error || 'Failed to send demo booking email to parent');
    }
  }

  static async sendSessionEnrollmentNotifications(sessionData: {
    parentName: string;
    parentEmail: string;
    parentPhone?: string;
    studentName: string;
    planName: string;
    billingMode: 'session' | 'month';
    amountUsd: number;
    paymentId?: string;
  }): Promise<void> {
    const adminHtml = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; background:#0b0b0b; color:#f5f5f5; line-height: 1.6; padding:20px;">
          <div style="max-width:700px;margin:0 auto;background:#141414;border:1px solid #2a2a2a;border-radius:10px;overflow:hidden;">
            <div style="text-align:center; padding:16px 18px 0;">
              <img src="${this.LOGO_URL}" alt="VR Robotics Academy" width="64" height="64" style="display:inline-block; border-radius:50%; border:2px solid #d4af37; background:#111;" />
            </div>
            <div style="background:#ff6a00;color:#fff;padding:14px 18px;font-size:24px;font-weight:700;">New Session Enrollment (Paid)</div>
            <div style="padding:0 18px 10px;margin-top:14px;"><div style="background:#d4af37;color:#1b1b1b;padding:10px 12px;border-radius:6px;font-weight:700;">Enrollment Details</div></div>
            <div style="padding:0 18px 18px;">
              <div style="background:#1b1b1b;border-left:4px solid #ff6a00;padding:10px;border-radius:6px;margin-bottom:10px;"><strong style="color:#ff8c42;">Parent Name:</strong> ${sessionData.parentName}</div>
              <div style="background:#1b1b1b;border-left:4px solid #ff6a00;padding:10px;border-radius:6px;margin-bottom:10px;"><strong style="color:#ff8c42;">Parent Email:</strong> ${sessionData.parentEmail}</div>
              <div style="background:#1b1b1b;border-left:4px solid #ff6a00;padding:10px;border-radius:6px;margin-bottom:10px;"><strong style="color:#ff8c42;">Parent Phone:</strong> ${sessionData.parentPhone || '-'}</div>
              <div style="background:#1b1b1b;border-left:4px solid #ff6a00;padding:10px;border-radius:6px;margin-bottom:10px;"><strong style="color:#ff8c42;">Student Name:</strong> ${sessionData.studentName}</div>
              <div style="background:#1b1b1b;border-left:4px solid #ff6a00;padding:10px;border-radius:6px;margin-bottom:10px;"><strong style="color:#ff8c42;">Plan:</strong> ${sessionData.planName} (${sessionData.billingMode})</div>
              <div style="background:#1b1b1b;border-left:4px solid #ff6a00;padding:10px;border-radius:6px;margin-bottom:10px;"><strong style="color:#ff8c42;">Amount (USD):</strong> $${sessionData.amountUsd}</div>
              ${sessionData.paymentId ? `<div style="background:#1b1b1b;border-left:4px solid #ff6a00;padding:10px;border-radius:6px;"><strong style="color:#ff8c42;">Payment ID:</strong> ${sessionData.paymentId}</div>` : ''}
            </div>
          </div>
        </body>
      </html>
    `;

    const adminResult = await this.simulateEmailSend({
      to: this.ADMIN_EMAIL,
      subject: `New Session Enrollment: ${sessionData.studentName}`,
      html: adminHtml,
    });
    if (!adminResult.success) {
      throw new Error(adminResult.error || 'Failed to send session enrollment email to admin');
    }

    const parentHtml = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; background:#0b0b0b; color:#f5f5f5; line-height: 1.6; padding:20px;">
          <div style="max-width:700px;margin:0 auto;background:#141414;border:1px solid #2a2a2a;border-radius:10px;overflow:hidden;">
            <div style="text-align:center; padding:16px 18px 0;">
              <img src="${this.LOGO_URL}" alt="VR Robotics Academy" width="64" height="64" style="display:inline-block; border-radius:50%; border:2px solid #d4af37; background:#111;" />
            </div>
            <div style="background:#ff6a00;color:#fff;padding:14px 18px;font-size:24px;font-weight:700;">Session Enrollment Confirmed</div>
            <div style="padding:14px 18px;color:#b8b8b8;">Dear ${sessionData.parentName},</div>
            <div style="padding:0 18px 10px;"><div style="background:#d4af37;color:#1b1b1b;padding:10px 12px;border-radius:6px;font-weight:700;">Plan Summary</div></div>
            <div style="padding:0 18px 18px;">
              <div style="background:#1b1b1b;border-left:4px solid #ff6a00;padding:10px;border-radius:6px;margin-bottom:10px;"><strong style="color:#ff8c42;">Plan:</strong> ${sessionData.planName} (${sessionData.billingMode})</div>
              <div style="background:#1b1b1b;border-left:4px solid #ff6a00;padding:10px;border-radius:6px;margin-bottom:10px;"><strong style="color:#ff8c42;">Amount:</strong> $${sessionData.amountUsd}</div>
              ${sessionData.paymentId ? `<div style="background:#1b1b1b;border-left:4px solid #ff6a00;padding:10px;border-radius:6px;"><strong style="color:#ff8c42;">Payment ID:</strong> ${sessionData.paymentId}</div>` : ''}
            </div>
            <div style="padding:0 18px 18px;color:#b8b8b8;">Our team will get in touch within the next 24 hours.</div>
          </div>
        </body>
      </html>
    `;

    const parentResult = await this.simulateEmailSend({
      to: sessionData.parentEmail,
      subject: 'Session Enrollment Confirmed - VR Robotics Academy',
      html: parentHtml,
    });
    if (!parentResult.success) {
      throw new Error(parentResult.error || 'Failed to send session enrollment email to parent');
    }
  }

  /**
   * Send student registration notification email to admin
   */
  static async sendStudentRegistrationEmail(studentData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    age: number;
    gender: string;
  }): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      console.log('[EmailService] Preparing student registration email for admin');

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; color: #333; }
              .container { max-width: 700px; margin: 0 auto; padding: 20px; }
              .header { background-color: #FF6A00; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
              .header h1 { margin: 0; font-size: 24px; }
              .content { background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
              .field { margin-bottom: 15px; padding: 12px; background-color: white; border-left: 4px solid #FF6A00; border-radius: 4px; }
              .label { font-weight: bold; color: #FF6A00; display: block; margin-bottom: 5px; }
              .value { color: #333; }
              .section-title { font-weight: bold; color: #FF6A00; margin-top: 20px; margin-bottom: 10px; font-size: 16px; border-bottom: 2px solid #FF6A00; padding-bottom: 8px; }
              .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✨ New Student Registration</h1>
                <p>A new student has registered for the VR Robotics Academy!</p>
              </div>
              
              <div class="content">
                <div class="section-title">Student Information</div>
                <div class="field">
                  <span class="label">Full Name:</span>
                  <span class="value">${studentData.fullName}</span>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <span class="value"><a href="mailto:${studentData.email}">${studentData.email}</a></span>
                </div>
                <div class="field">
                  <span class="label">Phone Number:</span>
                  <span class="value"><a href="tel:${studentData.phoneNumber}">${studentData.phoneNumber}</a></span>
                </div>
                <div class="field">
                  <span class="label">Age:</span>
                  <span class="value">${studentData.age} years</span>
                </div>
                <div class="field">
                  <span class="label">Gender:</span>
                  <span class="value">${studentData.gender}</span>
                </div>

                <div style="background-color: #FFE6CC; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #FF6A00;">
                  <p style="margin: 0; color: #333;"><strong>Status:</strong> Student registration has been submitted and is pending approval.</p>
                </div>
              </div>

              <div class="footer">
                <p>VR Robotics Academy - Student Registration System</p>
                <p>This is an automated email. Please do not reply directly to this address.</p>
              </div>
            </div>
          </body>
        </html>
      `;

      const payload: EmailPayload = {
        to: this.ADMIN_EMAIL,
        subject: `✨ New Student Registration: ${studentData.fullName}`,
        html: htmlContent,
      };

      console.log('[EmailService] Sending student registration email to admin:', this.ADMIN_EMAIL);
      return this.simulateEmailSend(payload);
    } catch (error) {
      console.error('[EmailService] Error sending student registration email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send student registration email',
      };
    }
  }

  /**
   * Helper function to format time slot display
   */
  private static formatTimeSlot(timeSlot: string): string {
    const timeSlots: { [key: string]: string } = {
      'morning': '9:00 AM - 12:00 PM',
      'afternoon': '12:00 PM - 3:00 PM',
      'evening': '3:00 PM - 6:00 PM'
    };
    return timeSlots[timeSlot] || timeSlot;
  }
}

export { EmailService };
