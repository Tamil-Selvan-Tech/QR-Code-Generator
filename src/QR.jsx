import React, { useState } from 'react'


const QR = () => {

    const [img, setImg] = useState("")
    const [loading, setLoading] = useState(false)
    const [qrData, setQrData] = useState("")
    const [qrSize, setQrSize] = useState("")

    async function generateQR() {
        setLoading(true)
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
            setImg(url)
        }
        catch (error) {
            console.error("Error generating QR code", error)
        }
        finally {
            setLoading(false)
        }
    }

    async function downloadQR() {
        fetch(img)
            .then(response => response.blob())
            .then((blob) => {
                const link = document.createElement("a")
                link.href = URL.createObjectURL(blob)
                link.download = "QRcode.png"
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            })
    }

    return (
        <>
            <div className="app-container">
                <h1>QR-CODE-GENERATOR</h1>
                {loading && <p>Please Wait...</p>}

                <img src={img} alt="" className='qr-image' />
                <div>
                    <label htmlFor="dataInput" className='input-label'  >Data for QR Code:</label>
                    <input type="text" id='dataInput' placeholder='Enter data for QR Code' value={qrData}
                        onChange={(e) => setQrData(e.target.value)} />

                    <label htmlFor="dataInput" className='input-label'>Image Size (e.g.,150)</label>
                    <input type="text" id='sizeInput' placeholder='Enter image size' value={qrSize}
                        onChange={(e) => setQrSize(e.target.value)} />

                    <button className='gen-button ' onClick={generateQR}>Generate QR Code</button>
                    <button className='down-button' onClick={downloadQR} >Download QR Code</button>
                </div>
                <p className='footer'>Designed by <a href="https://github.com/Tamil-Selvan-Tech">Tamil</a></p>
            </div>
        </>
    )
}

export default QR