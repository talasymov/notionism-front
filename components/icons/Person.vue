<template>
    <svg class="profile-icon" width="38" height="37" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M22.3506 14C20.6937 14 19.3506 15.3432 19.3506 17C19.3506 18.6568 20.6937 20 22.3506 20C24.0075 20 25.3506 18.6568 25.3506 17C25.3506 15.3432 24.0075 14 22.3506 14ZM17.3506 17C17.3506 14.2386 19.5892 12 22.3506 12C25.112 12 27.3506 14.2386 27.3506 17C27.3506 19.7614 25.112 22 22.3506 22C19.5892 22 17.3506 19.7614 17.3506 17Z"
              fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M22.3506 25C18.9082 25 17.0986 26.2198 16.1958 27.6976C15.8816 28.212 15.9606 28.6971 16.3442 29.1428C16.7626 29.629 17.5192 30 18.3506 30H26.3506C27.182 30 27.9386 29.629 28.357 29.1428C28.7406 28.6971 28.8196 28.212 28.5055 27.6976C27.6027 26.2198 25.793 25 22.3506 25ZM14.489 26.655C15.8383 24.4462 18.3875 23 22.3506 23C26.3138 23 28.8629 24.4462 30.2122 26.655C31.0497 28.0259 30.7291 29.4526 29.873 30.4474C29.0516 31.4018 27.7283 32 26.3506 32H18.3506C16.9729 32 15.6496 31.4018 14.8283 30.4474C13.9721 29.4526 13.6516 28.0259 14.489 26.655Z"
              fill="black"/>
        <rect class="profile-icon__bg" x="1" y="1" width="42.7013" height="42" rx="13" stroke="black"
              stroke-opacity="0.19" stroke-width="2"/>
    </svg>
</template>

<style lang="scss">
.profile-icon {
    transition: 150ms ease-in-out;
  &__bg {
    transition: 150ms ease-in-out;
  }

  &:hover {
    .profile-icon__bg {
      fill: rgba(155, 155, 155, 0.1);
    }
  }

  &:active {
    .profile-icon__bg {
      fill: rgba(155, 155, 155, 0.3);
    }
  }
}
</style>