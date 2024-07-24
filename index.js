const crypto = require('crypto')

const now = Date.now()

const pbkdf2 = (index) => {
	crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
		console.log(index + ': ', Date.now() - now)
	})
}

pbkdf2(1)
pbkdf2(2)
pbkdf2(3)
pbkdf2(4)
