HTMLElement.prototype.copyProps = function(source){
    var copyStyle = getComputedStyle(source);
    for(var i = 0; i < copyStyle.length; i++){
        var prop = copyStyle[i];
        this.style[prop] = copyStyle[prop];
    }
}

var trie = new Trie();

var dictionary = getDictionary();
for(var word in dictionary){
    trie.add(word);
}
trie.add('no stand');
trie.add('minor wear');
trie.add('cracked screen');
trie.add('dead pixels');
trie.add('dark spots');
trie.add('scratches');
trie.add('screen lines');


var trieText = document.getElementById("trie-text");
trieText.addEventListener("scroll", function(event){
    console.log(event);
})

trieText.addEventListener("keyup", function(event){
    var textarea = event.target;
    var div = getTextCopyDiv();
    writeDiv();
    var helperDiv = createHelperDiv();
    fillHelper();
    div.parentElement.removeChild(div);

    function fillHelper(){
        var valueArr = getTextAreaValues()['startVal'].split(' ');
        var value = valueArr[valueArr.length - 1];  
        if(value.length <= 1){
            return;
        }        
        var words = trie.findWords(value);
        if(words.length > 0){
            var list = document.createElement("div");
            for(var i = 0; i < words.length; i++){
                var item = document.createElement("div");
                item.innerText = words[i];
                list.appendChild(item);
            }
            helperDiv.appendChild(list);
        }
    }
    function getTextAreaValues(){
        var value = textarea.value;
        return {
            startVal: value.substring(0, textarea.selectionStart),
            endVal: value.substring(textarea.selectionStart)
        };
    }
    function getTextCopyDiv(){
        // var div = document.getElementById("text-copy");
        var div = document.createElement("div");
        textarea.parentElement.appendChild(div);

        div.copyProps(textarea);
        // div.style.overflow = 'visible';
        div.style.wordWrap = 'break-word';
        div.style.display = '';
        return div;
    }
    function writeDiv(){
        var textareaValues = getTextAreaValues();
        var span = document.createElement("span");
        span.style.display = 'inline-block';
        div.innerHTML = textareaValues.startVal;
        div.appendChild(span);
        div.innerHTML += textareaValues.endVal;
    }

    function getSpanOffset(){
        var inSpan = div.querySelector("span");
        return {
            top: inSpan.offsetTop,
            left: inSpan.offsetLeft
        }
    }
    function createHelperDiv(){
        var spanOffset = getSpanOffset();
        var helperDiv = document.getElementById("helper");
        helperDiv.innerHTML = '';
        // helperDiv.innerText = 'Testing';
        helperDiv.style.position = "absolute";
        helperDiv.style.top = spanOffset.top - textarea.offsetHeight + "px";
        helperDiv.style.left = spanOffset.left + "px";
        
        return helperDiv
    }

    function spaceReplace(aString){
        
    }
});