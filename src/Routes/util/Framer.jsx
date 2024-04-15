const up = {
  container: {
    hidden: {
      opacity: 0,
      y: 100,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 0.3,
        when: 'beforeChildren',
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      y: 100,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  },
};
const opacity = {
  container: {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  },
};
const left = {
  container: {
    hidden: {
      opacity: 0,
      x: 200,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.3,
        ease: 'easeIn',
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      x: 200,
    },
    show: {
      opacity: 1,
      x: 0,
    },
  },
};

export { up, opacity, left };
