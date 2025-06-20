
const analyzeButton = document.getElementById("analyze");
const uploadInput = document.getElementById("upload");
const resultsDiv = document.getElementById("results");
const docType = document.getElementById("document-type");

analyzeButton.onclick = async () => {
    if (!uploadInput.files.length || !docType.value) {
        alert("Merci de sélectionner un document et un type.");
        return;
    }

    const file = uploadInput.files[0];
    resultsDiv.innerText = "Analyse en cours...";

    try {
        const pipeline = await window.transformers.pipeline("image-classification", "Xenova/vit-base-patch16-224");
        const image = await loadImage(file);
        const outputs = await pipeline(image);
        const pred = outputs[0]?.label || "inconnu";

        resultsDiv.innerHTML = `
          <p><strong>Type détecté :</strong> ${pred}</p>
          <p><strong>Type attendu :</strong> ${docType.value}</p>
          <p><strong>Validité :</strong> ${pred.includes(docType.value) ? "✔️ cohérent" : "❌ incohérent"}</p>
        `;
    } catch (e) {
        resultsDiv.innerText = "Erreur IA : " + e.message;
    }
};

function loadImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = ev => {
            const img = new Image();
            img.src = ev.target.result;
            img.onload = () => resolve(img);
            img.onerror = reject;
        };
        reader.readAsDataURL(file);
    });
}
