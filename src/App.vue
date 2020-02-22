<template>
    <div id="app" :class="$style.app">
        <div :class="$style.controlBar">
            <h5 class="m-0">Vue DVD Saver</h5>
            <b-form inline>
                <div :class="$style.controlGroup">
                    <label for="inputSpeed" class="mr-2">Speed</label>
                    <b-form-input
                        type="range"
                        :min="1"
                        :max="50"
                        :step="1"
                        v-model="rawSpeed"
                        class="d-block"
                        id="inputSpeed"
                    ></b-form-input>
                </div>
                <div :class="$style.controlGroup">
                    <label for="inputWidth" class="mr-2">Width</label>
                    <b-input-group size="sm" append="px">
                        <b-form-input
                            type="number"
                            :min="50"
                            :max="1000"
                            :step="10"
                            :debounce="500"
                            v-model="rawWidth"
                            class="d-block"
                            id="inputWidth"
                            size="sm"
                            style="width: 80px"
                        ></b-form-input>
                    </b-input-group>
                </div>
                <div :class="$style.controlGroup">
                    <b-form-radio-group
                        buttons
                        button-variant="outline-secondary"
                        id="themeSelect"
                        v-model="theme"
                        :options="themeOptions"
                        name="themeSelect"
                        size="sm"
                    ></b-form-radio-group>
                </div>
            </b-form>
        </div>
        <ScreenSaver
            :class="$style.saver"
            :speed="speed"
            :logoWidth="logoWidth"
            :theme="theme"
        />
    </div>
</template>

<script>
import ScreenSaver from './ScreenSaver.vue'

export default {
    name: 'App',
    components: {
        ScreenSaver
    },

    data: () => ({
        rawSpeed: 4,
        rawWidth: 220,
        theme: 'dark',
        themeOptions: [
            { text: 'Light', value: 'light' },
            { text: 'Dark', value: 'dark' }
        ]
    }),

    computed: {
        speed() {
            return parseInt(this.rawSpeed)
        },
        logoWidth() {
            return parseInt(this.rawWidth)
        }
    }
}
</script>

<style>
html,
body {
    height: 100%;
    width: 100%;
}
</style>

<style module>
.app {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.saver {
    flex: 1;
}

.controlBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 0 0 auto;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid black;
}

.controlGroup {
    display: flex;
    align-items: center;
}

.controlGroup + .controlGroup {
    margin-left: 1rem;
    padding-left: 1rem;
    border-left: 1px solid #eee;
}
</style>
