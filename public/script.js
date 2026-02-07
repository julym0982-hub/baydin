
const video = document.getElementById('webcam');

const canvas = document.getElementById('canvas');

const captureBtn = document.getElementById('captureBtn');

const retakeBtn = document.getElementById('retakeBtn');

const previewImage = document.getElementById('previewImage');

const submitBtn = document.getElementById('submitBtn');

const loading = document.getElementById('loading');

const resultBox = document.getElementById('resultBox');

const resultContent = document.getElementById('resultContent');



// ကင်မရာ ဖွင့်ခြင်း

async function initCamera() {

    try {

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        video.srcObject = stream;

    } catch (err) {

        alert("ကင်မရာ ဖွင့်မရပါဗျ။");

    }

}



// ဓာတ်ပုံရိုက်ခြင်း

captureBtn.onclick = () => {

    canvas.width = video.videoWidth;

    canvas.height = video.videoHeight;

    canvas.getContext('2d').drawImage(video, 0, 0);

    previewImage.src = canvas.toDataURL('image/jpeg');

    video.style.display = 'none';

    previewImage.style.display = 'block';

    captureBtn.style.display = 'none';

    retakeBtn.style.display = 'inline-block';

};



retakeBtn.onclick = () => {

    video.style.display = 'block';

    previewImage.style.display = 'none';

    captureBtn.style.display = 'inline-block';

    retakeBtn.style.display = 'none';

};



// Backend သို့ ပို့ဆောင်ခြင်း

submitBtn.onclick = async () => {

    const name = document.getElementById('userName').value;

    const age = document.getElementById('userAge').value;

    const gender = document.getElementById('userGender').value;

    const question = document.getElementById('userQuestion').value;



    if (!name || !question) return alert("အမည်နဲ့ မေးခွန်း ဖြည့်ပေးပါဦးဗျ။");



    loading.classList.remove('hidden');

    resultBox.classList.add('hidden');

    submitBtn.disabled = true;



    try {

        const response = await fetch('http://localhost:3000/api/baydin', {

            method: 'POST',

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({ name, age, gender, question })

        });



        const data = await response.json();

        

        if (data.result) {

            resultContent.innerText = data.result;

            resultBox.classList.remove('hidden');

            resultBox.scrollIntoView({ behavior: 'smooth' });

        } else {

            alert("အမှားအယွင်း ရှိနေပါတယ်ဗျ။");

        }

    } catch (error) {

        alert("Server Error: ချိတ်ဆက်မှု မအောင်မြင်ပါ။");

    } finally {

        loading.classList.add('hidden');

        submitBtn.disabled = false;

    }

};



initCamera();

