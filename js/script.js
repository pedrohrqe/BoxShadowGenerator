class BoxShadowGenerator {
    constructor(horizontal, horizontalRef, vertical, verticalRef, blur, blurRef, spread, spreadRef, previewBox, rule, webkitRule, mozRule, colorRef, opacity, opacityRef) {
        this.horizontal = horizontal
        this.horizontalRef = horizontalRef
        this.vertical = vertical
        this.verticalRef = verticalRef
        this.blur = blur
        this.blurRef = blurRef
        this.spread = spread
        this.spreadRef = spreadRef
        this.colorRef = colorRef
        this.opacity = opacity
        this.opacityRef = opacityRef
        this.insetRef = insetRef
        this.previewBox = previewBox
        this.rule = rule
        this.webkitRule = webkitRule
        this.mozRule = mozRule
    }

    initialize() {
        this.horizontalRef.value = this.horizontal.value
        this.verticalRef.value = this.vertical.value
        this.spreadRef.value = this.spread.value
        this.blurRef.value = this.blur.value
        this.opacityRef.value = this.opacity.value

        this.applyRule()
        this.showRule()
    }

    applyRule() {
        const color = this.colorRef.value
        const opacity = this.opacityRef.value * 100
        const isInset = this.insetRef.checked == true ? "inset " : []

        const boxShadow = `${isInset}${this.horizontalRef.value}px ${this.verticalRef.value}px ${this.blurRef.value}px ${this.spreadRef.value}px ${this.hexWithOpacity(color, opacity)}`

        this.previewBox.style.boxShadow = boxShadow

        this.currentRule = boxShadow
    }

    showRule() {
        this.rule.innerText = this.currentRule
        this.webkitRule.innerText = this.currentRule
        this.mozRule.innerText = this.currentRule
    }

    updateValue(type, value) {
        if (value === "-" || value === "" || value == "0.") {
            return;
        }

        switch (type) {
            case "horizontal":
                this.horizontal.value = value
                break
            case "vertical":
                this.vertical.value = value
                break
            case "blur":
                this.blur.value = value
                break
            case "spread":
                this.spread.value = value
                break
            case "opacity":
                this.opacity.value = value
        }
        this.initialize()
    }

    hexWithOpacity(hex, opacity) {
        // Verifica se a cor em hexadecimal é válida
        if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
            return "Cor inválida";
        }

        // Converte a opacidade para um valor entre 0 e 255
        const alpha = Math.round((opacity / 100) * 255).toString(16).padStart(2, '0').toUpperCase();

        // Retorna o código hexadecimal com a opacidade adicionada
        return hex + alpha;
    }

    returnText() {
        return `${this.rule.parentElement.innerText}\n${this.webkitRule.parentElement.innerText}\n${this.mozRule.parentElement.innerText}`
    }
}

const horizontal = document.querySelector("#horizontal")
const horizontalRef = document.querySelector("#horizontal-value")
const vertical = document.querySelector("#vertical")
const verticalRef = document.querySelector("#vertical-value")
const blur = document.querySelector("#blur")
const blurRef = document.querySelector("#blur-value")
const spread = document.querySelector("#spread")
const spreadRef = document.querySelector("#spread-value")
const colorRef = document.querySelector("#color-value")
const opacity = document.querySelector("#opacity")
const opacityRef = document.querySelector("#opacity-value")
const insetRef = document.querySelector("#inset-value")

const previewBox = document.querySelector("#box")

const rule = document.querySelector("#rule span")
const webkitRule = document.querySelector("#webkit-rule span")
const mozRule = document.querySelector("#moz-rule span")

const generatedRule = document.querySelector("#generated-rule")

const boxShadow = new BoxShadowGenerator(horizontal, horizontalRef, vertical, verticalRef, blur, blurRef, spread, spreadRef, previewBox, rule, webkitRule, mozRule, colorRef, opacity, opacityRef, insetRef)

boxShadow.initialize()

for (const element of [horizontal, horizontalRef, vertical, verticalRef, blur, blurRef, spread, spreadRef, colorRef, opacity, opacityRef, insetRef]) {
    element.addEventListener("input", () => {
        const type = (element.getAttribute("id")).replace("-value", "")
        const value = element.value
        boxShadow.updateValue(type, value)
    })

    element.addEventListener("change", () => {
        if (!element.value || element.value == "-") {
            element.value = "0"
            element.dispatchEvent(new Event("input"))
        }
    })
}

generatedRule.addEventListener("click", () => {
    navigator.clipboard.writeText(boxShadow.returnText())
    const h2 = generatedRule.querySelector("h2")
    const h2Text = h2.innerText

    h2.innerText = "Copiado!"

    setTimeout(() => {
        h2.innerText = h2Text
    }, 400);
})
