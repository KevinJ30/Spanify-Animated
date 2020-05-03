(function() {
    const ANIMATION_DELAY = 0.3


    function spanify(element) {
        const nodes = element.childNodes;
        let newNodes = [];

        for(let i = 0; i < nodes.length; i++) {
            if(nodes[i].nodeType === Node.TEXT_NODE) {
                let addSpan = addSpanToTextNode(nodes[i].textContent)
                newNodes = newNodes.concat(addSpan)
            }
            else if(nodes[i].nodeType === Node.ELEMENT_NODE) {
                // Si le textContent est vide on injecte directement la balise
                // Sinon on integre une span a l'intérieure

                if(nodes[i].textContent == '') {
                    // On recounstruit le la balise
                    newNodes.push(nodes[i])
                }
                else {
                    let addSpan = addSpanToTextNode(nodes[i].textContent, nodes[i])
                    newNodes = newNodes.concat(addSpan)
                }
            }
        }

        // Reset du contenu de la balise
        element.innerHTML = ""
        for(let k = 0; k < newNodes.length; k++) {
            element.appendChild(newNodes[k])
        }

    }

    function addSpanToTextNode(words, element_node) {
        let nodes = []
        words = words.trim().split(' ')
        
        if(element_node === undefined) {
            // On parcours le tableaux
            nodes = nodes.concat(addSpan(words));
        }
        else {
            let addSpanNodes = addSpan(words)
            element_node.innerHTML = ''
            for(let i = 0; i < addSpanNodes.length; i++) {
                element_node.appendChild(addSpanNodes[i])
            }

            nodes = nodes.concat(element_node)
        }

        return nodes
    }

    function addSpan(words) {
        let nodes = []
        for(let i = 0; i < words.length; i++) {
            let newElement = document.createElement('span')
            newElement.innerHTML = words[i] + ' '
            nodes.push(newElement)
        }
        return nodes;
    }

    spanify(document.querySelector('.title'))

    // Gestion de l'annimation
    let spans = document.querySelectorAll('.title span')

    for(let i = 0; i < spans.length; i++) {
        let delay = ANIMATION_DELAY * i
        spans[i].style.animationDelay = delay.toString() + 's'
    }
})()