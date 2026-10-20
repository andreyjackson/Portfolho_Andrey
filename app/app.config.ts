export default defineAppConfig({
  ui: {
    colors: {
      primary: 'matrix',
      secondary: 'pink',
      info: 'cyan',
      success: 'emerald',
      neutral: 'ink',
    },
    header: {
      slots: {
        title: 'font-display text-[22px]',
      },
    },
    pageSection: {
      slots: {
        container: 'py-20 sm:py-20 lg:py-20 gap-12 sm:gap-12',
        headline: 'mb-3 font-mono font-normal text-[13px]',
        title: 'font-display text-3xl sm:text-[40px] lg:text-[40px]',
        description: 'mt-3 text-base sm:text-base',
        body: 'mt-12',
      },
    },
  },
})
