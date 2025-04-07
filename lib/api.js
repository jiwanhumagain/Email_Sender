const sendFormDetail = async (formData) => {
    try {
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const contentType = response.headers.get('content-type');
  
      if (!response.ok) {
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Something went wrong');
        } else {
          const errorText = await response.text();
          throw new Error(errorText);
        }
      }
  
      const data = await response.json();
      alert('Email sent successfully!');
      return data;
    } catch (error) {
      console.error('Error sending email:', error.message);
      alert('Failed to send the details. Please try again.');
    }
  };
  
  export default sendFormDetail;
  