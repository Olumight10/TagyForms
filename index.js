document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitBtn = document.getElementById("submitBtn");

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Loading...";

    const formData = new FormData(form);

    // Build a plain object from form data
    const data = { action: "storeParticipant" };
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbzT-Iu2fUvfxwUMS2r4bUOmDFlwP6fpA8xGPFwgSOfbmB2ygMpEj0cWA3OBZNXB-_uo_A/exec", {
        method: "POST",
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("✅ Registration Successful");
        window.location.href = "index.html"; // ✅ Redirect or update UI
      } else {
        showError("Form submitted, but something went wrong: " + result.message);
      }
    } catch (error) {
      showError("Failed to submit form: " + error.message);
    } finally {
      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  });

  function showError(message) {
    alert(message);
  }
});
