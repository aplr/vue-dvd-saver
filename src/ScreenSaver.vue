<template>
    <canvas :style="canvasStyle"></canvas>
</template>

<script>
import DvdLogo from '@/assets/dvd.svg?inline'

const gcd = (x, y) => {
    x = Math.abs(x)
    y = Math.abs(y)
    while (y) {
        var t = y
        y = x % y
        x = t
    }
    return x
}

const lcm = (x, y) => (!x || !y ? 0 : Math.abs((x * y) / gcd(x, y)))

const parseSvg = svg => {
    return new DOMParser().parseFromString(svg, 'image/svg+xml')
}

const randomColor = () => {
    const c = () => Math.random() * (254 - 0) + 0

    return `rgb(${c()}, ${c()}, ${c()})`
}

const coloredLogo = color => {
    const logo = parseSvg(DvdLogo)
    logo.querySelectorAll('path,polygon').forEach(layer => {
        layer.setAttribute('fill', color)
    })
    return `data:image/svg+xml;utf8,${logo.documentElement.outerHTML}`
}

const randomColoredLogo = () => coloredLogo(randomColor())

export default {
    props: {
        speed: {
            type: Number,
            required: false,
            default: 4
        },
        logoWidth: {
            type: Number,
            required: false,
            default: 220
        },
        theme: {
            type: String,
            required: false,
            default: 'dark',
            validator: val => ['dark', 'light'].indexOf(val) !== -1
        },
        showTimer: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data: () => ({
        x: 0,
        y: 0,
        xSpeed: 0,
        ySpeed: 0,
        img: new Image(),
        logoHeight: 0,
        lastCornerTime: 0,
        prevHitTime: 0,
        hitTime: 0
    }),

    created() {
        this.xSpeed = this.ySpeed = this.speed
        this.generateColoredLogo()
        this.img.onload = () => {
            this.logoHeight = Math.floor(
                this.logoWidth * (this.img.height / this.img.width)
            )
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.resize()
            window.addEventListener('resize', this.resize)
            this.lastCornerTime = this.prevHitTime = this.hitTime = performance.now()
            this.draw()
        })
    },

    watch: {
        speed(speed) {
            this.xSpeed = speed * Math.sign(this.xSpeed)
            this.ySpeed = speed * Math.sign(this.ySpeed)
        },
        logoWidth() {
            this.x = this.y = 0
        }
    },

    computed: {
        canvasStyle() {
            return {
                'background-color': this.backgroundColor
            }
        },
        backgroundColor() {
            return this.backgroundColors[this.theme]
        },
        backgroundColors() {
            return {
                dark: '#000000',
                light: '#ffffff'
            }
        },
        edgeTime() {
            return Math.floor(this.hitTime - this.prevHitTime)
        },
        timeToCorner() {
            return (
                ((this.edgeTime / 1000) *
                    lcm(
                        this.$el.height - this.logoHeight,
                        this.$el.width - this.logoWidth
                    )) /
                (this.$el.width - this.logoWidth)
            )
        }
    },

    methods: {
        generateColoredLogo(color) {
            this.img.src = color ? coloredLogo(color) : randomColoredLogo()
        },
        draw() {
            const ctx = this.$el.getContext('2d'),
                { img, x, y, logoWidth, logoHeight, xSpeed, ySpeed } = this

            ctx.fillStyle = this.backgroundColor
            ctx.fillRect(0, 0, this.$el.width, this.$el.height)
            ctx.drawImage(img, x, y, logoWidth, logoHeight)

            if (this.showTimer) {
                ctx.font = '16px Arial'
                ctx.fillStyle = '#fff'

                const countdown = Math.round(
                    this.timeToCorner -
                        (performance.now() - this.lastCornerTime) / 1000
                )

                ctx.fillText(
                    this.prevHitTime == this.hitTime
                        ? 'Calculating corner time...'
                        : `Corner in ${countdown}s`,
                    16,
                    36
                )
            }

            this.x += xSpeed
            this.y += ySpeed

            const xHit = logoWidth + this.x >= this.$el.width || this.x <= 0
            const yHit = logoHeight + this.y >= this.$el.height || this.y <= 0

            if (xHit) {
                this.xSpeed *= -1
                this.prevHitTime = this.hitTime
                this.hitTime = performance.now()
            }

            if (yHit) {
                this.ySpeed *= -1
            }

            if (xHit && yHit) {
                this.generateColoredLogo('rgb(255,255,255)')
                this.lastCornerTime = performance.now()
            } else if (xHit || yHit) {
                this.generateColoredLogo()
            }

            requestAnimationFrame(this.draw)
        },
        resize() {
            this.$el.width = this.$el.clientWidth
            this.$el.height = this.$el.clientHeight
        }
    }
}
</script>
