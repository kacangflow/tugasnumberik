document.addEventListener("DOMContentLoaded", function() {
    const title = document.getElementById('typing-text');
    const text = "Metode Numerik";
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 250); 
        }
    }
    typeWriter();
});
