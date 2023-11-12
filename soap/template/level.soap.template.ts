
const url = process.env.SOAP_URL_LEVEL +`?APIkey=${process.env.SOAP_KEY}` || ''
const header = {
    "Content-Type": "text/xml;charset=UTF-8"
}

export const getExp: SoapRequest = {
    url: url,
    header: header,
    template: `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <getExpCreator xmlns="http://Services.nutricraft.org/">
                <arg0 xmlns="">%s</arg0>
            </getExpCreator>
        </Body>
    </Envelope>
    `
}

export const addExp: SoapRequest = {
    url: url,
    header: header,
    template:`
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <addExpCreator xmlns="http://Services.nutricraft.org/">
                <arg0 xmlns="">%s</arg0>
                <arg1 xmlns="">%d</arg1>
            </addExpCreator>
        </Body>
    </Envelope>
    `
}

export const subtractExp: SoapRequest = {
    url: url,
    header: header,
    template: `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <substractExpCreator xmlns="http://Services.nutricraft.org/">
                <arg0 xmlns="">%s</arg0>
                <arg1 xmlns="">%d</arg1>
            </substractExpCreator>
        </Body>
    </Envelope>
    `
}

export const newLevelAccount: SoapRequest = {
    url: url,
    header: header,
    template: `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <newCreator xmlns="http://Services.nutricraft.org/">
                <arg0 xmlns="">%s</arg0>
            </newCreator>
        </Body>
    </Envelope>
    `
}