<template>
    <canvas :style="canvasStyle"></canvas>
</template>

<script>
import DvdLogo from '@/assets/dvd.svg?inline'

const parseSvg = svg => {
    return new DOMParser().parseFromString(svg, 'image/svg+xml')
}

const randomColor = () => {
    const c = () => Math.random() * (254 - 0) + 0

    return `rgb(${c()}, ${c()}, ${c()})`
}

const colorizedLogo = color => {
    const logo = parseSvg(DvdLogo)
    logo.getElementsByTagName('path').forEach(layer => {
        layer.setAttribute('fill', color)
    })
    return `data:image/svg+xml;charset=utf-8,${logo.documentElement.outerHTML}`
}

const randomColoredLogo = () => colorizedLogo(randomColor())

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
        }
    },

    data: () => ({
        x: 0,
        y: 0,
        xSpeed: 0,
        ySpeed: 0,
        img: new Image()
    }),

    created() {
        this.xSpeed = this.ySpeed = this.speed
        this.generateColoredLogo()
    },

    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.resize)
            this.resize()
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
        logoHeight() {
            return this.logoWidth * (this.img.height / this.img.width)
        },
        canvasStyle() {
            return {
                'background-color':
                    this.theme === 'light' ? '#ffffff' : '#000000'
            }
        }
    },

    methods: {
        generateColoredLogo() {
            this.img.src = randomColoredLogo()
        },
        draw() {
            const ctx = this.$el.getContext('2d'),
                { img, x, y, logoWidth, logoHeight, xSpeed, ySpeed } = this

            ctx.fillStyle = '#000'
            ctx.fillRect(0, 0, this.$el.width, this.$el.height)
            ctx.drawImage(img, x, y, logoWidth, logoHeight)

            this.x += xSpeed
            this.y += ySpeed

            if (logoWidth + this.x >= this.$el.width || this.x <= 0) {
                this.xSpeed *= -1
                this.generateColoredLogo()
            }

            if (logoHeight + this.y >= this.$el.height || this.y <= 0) {
                this.ySpeed *= -1
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
