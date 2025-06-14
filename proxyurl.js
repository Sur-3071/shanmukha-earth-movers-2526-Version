function transalate() {
    let convert = document.getElementById("cusname");
    let content = document.getElementById("name3").value;

        
    

    let transLINK = `https://api.mymemory.translated.net/get?q=${content}&langpair=en-GB|te-IN`;

    fetch(transLINK)
        .then(response => response.json())
        .then(data => {
            // Handle the translated data here
            convert.innerHTML = "";
            let text = data.responseData.translatedText;
            // alert(text);
            convert.innerHTML = text;
            console.log(text);
        });
    }
