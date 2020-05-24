<template>
    <vue-design-t-shape>
        <vue-design-header slot="header" />
        <vue-design-aside slot="aside" v-if="asideMenu" />
        <vue-design-body slot="body">
            <router-view/>
        </vue-design-body>
    </vue-design-t-shape>
</template>

<script>
import { mapGetters } from 'vuex';
import VueDesignTShape from '../components/VueDesignTShape';
import VueDesignAside from '../components/VueDesignAside';
import VueDesignHeader from '../components/VueDesignHeader';
import VueDesignBody from '../components/VueDesignBody';

export default {
    name: 'vued-admin',
    components: {
        VueDesignTShape,
        VueDesignAside,
        VueDesignHeader,
        VueDesignBody
    },
    computed: {
        ...mapGetters('admin', [
            'asideMenu'
        ])
    },
    watch: {
        asideMenu: {
            handler(nv) {
                if (nv && nv.length > 0) {
                    const actions = this.getActions(nv, this.$route.name);
                    this.$store.commit('admin/ACTIONS', actions);
                }
            },
            deep: true
        },
        '$route'() {
            const actions = this.getActions(this.asideMenu, this.$route.name);
            this.$store.commit('admin/ACTIONS', actions);
        }
    },
    created() {
        // this.$store.dispatch('admin/findMenu');
        // this.$store.dispatch('global/permission');
    },
    methods: {
        getActions(data, path) {
            let actions = [];
            function setActions(data, path) {
                data && data.length > 0 && data.forEach(item => {
                    if (item.name && item.name === path) {
                        if (item.actions && item.actions.length > 0) {
                            actions = item.actions;
                        }
                    } else {
                        setActions(item.children, path);
                    }
                });
            }

            setActions(data, path);
            return actions;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
