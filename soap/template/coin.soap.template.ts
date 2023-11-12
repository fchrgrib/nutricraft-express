import exp from "constants";

const url = process.env.SOAP_URL_COIN +`?APIkey=${process.env.SOAP_KEY}` || ''
const header = {
    "Content-Type": "text/xml;charset=UTF-8"
}

export const getCoin : SoapRequest = {
    url : url,
    header: header,
    template: `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <getCoins xmlns="http://Services.nutricraft.org/">
                <arg0 xmlns="">%s</arg0>
            </getCoins>
        </Body>
    </Envelope>
    `
}

export const addCoin : SoapRequest = {
    url: url,
    header: header,
    template: `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <addCoins xmlns="http://Services.nutricraft.org/">
                <arg0 xmlns="">%s</arg0>
                <arg1 xmlns="">%d</arg1>
            </addCoins>
        </Body>
    </Envelope>
    `
}

export const subtractCoin : SoapRequest = {
    url: url,
    header: header,
    template: `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <substractCoins xmlns="http://Services.nutricraft.org/">
                <arg0 xmlns="">%s</arg0>
                <arg1 xmlns="">%d</arg1>
            </substractCoins>
        </Body>
    </Envelope>
    `
}

export const newCoinAccount : SoapRequest = {
    url : url,
    header : header,
    template: `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <newCoins xmlns="http://Services.nutricraft.org/">
                <arg0 xmlns="">%s</arg0>
            </newCoins>
        </Body>
    </Envelope>
    `
}