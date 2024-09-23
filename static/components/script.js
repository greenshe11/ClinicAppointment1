export class Component {
    constructor(layout, styling=null){
        this.layout = layout
        this.styling = styling
    }

    async setToElement(element){
        const layoutText = await this._readFile(this.layout)
        const stylingText = await this._readFile(this.styling)

        // add CSS styles to document
        const styleElement = document.createElement('style');
        styleElement.textContent = stylingText;
        document.head.appendChild(styleElement);

        // put content inside an element's inner html
        element.innerHTML = layoutText;
        console.log('component loaded')
    }
    
    async _readFile(src) {
        try {
            let text = ''

            const response = await fetch(src);
            if (!response.ok) {
                throw new Error(`Network response was not ok. Cannot load html: ${src}`);
            }
            text = await response.text();
            return text
        } catch (error) {
            console.error('Error fetching file:', error);
        }
    }

}
