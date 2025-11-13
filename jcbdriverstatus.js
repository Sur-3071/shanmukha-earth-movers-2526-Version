function GetSystemId(outputId) {
    let id = Date.now();
    document.getElementById(outputId).value = id;
}