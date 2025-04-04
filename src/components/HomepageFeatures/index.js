import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Tutorials',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Nơi bạn dựng dịch vụ ngon như cơm mẹ nấu, bảo mật như két sắt, và học hành thì vui như đi ăn buffet tech! 😎🔥
      </>
    ),
  },
  {
    title: 'Blog',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Nơi tụ họp của những tâm hồn lạc lối trong log, sống như <code>culi ops</code>, ngày ngày vá bug, giữ prod sống như giữ lửa. 🔥🧎‍♂️
      </>
    ),
  },
  {
    title: 'Guides',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Tại đây, bạn sẽ tìm thấy hướng dẫn ngắn gọn, dễ hiểu – đủ để bạn làm chủ CuliOps.Dev trước khi prod kịp down! 😎💻🔥
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
