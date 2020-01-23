<template>
    <div>
        <p class="error">{{propmsg}}</p>
    </div>
</template>

<script>
    export default {
props:{
    propmsg:{
        type:String,
        required: true
    }
}
    }
</script>
