
document.getElementById('submitBtn').onclick = function () {
    const mastercard = document.getElementById('masterCardBtn');
    const vervecard = document.getElementById('verveCardBtn');
    const visacard = document.getElementById('visaCardBtn');
    if (mastercard.checked) {
        console.log('mastercard chosen');
    }
    else if (vervecard.checked) {
        console.log('verve chosen');
    }
    else if (visacard.checked) {
        console.log('visa chosen');
    }
    else {
        console.log('Choose a payment Option');
    }
}
