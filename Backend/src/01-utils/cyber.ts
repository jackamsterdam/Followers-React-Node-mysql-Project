import crypto from 'crypto'


const salt = "MakeThingsGoRight"

function hash(plainText: string): string {
    if (!plainText) return null 
    const hashedText = crypto.createHmac('sha512', salt).update(plainText).digest('hex')
    return hashedText



}











export default {
    hash
}