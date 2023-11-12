const url = process.env.SOAP_URL_SUBSCRIBE +`?APIkey=${process.env.SOAP_KEY}` || ''
const header = {
    "Content-Type": "text/xml;charset=UTF-8"
}

export const getSubscriber: SoapRequest = {
    url: url,
    header: header,
    template: `
                <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                    <Body>
                        <getSubscribers xmlns="http://Services.nutricraft.org/">
                            <arg0 xmlns="">%s</arg0>
                        </getSubscribers>
                    </Body>
                </Envelope>`
}

