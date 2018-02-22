import Typography from 'typography';
//import kirkhamTheme from 'typography-theme-kirkham';
import githubTheme from 'typography-theme-github';

githubTheme.headerFontFamily= ['Roboto','Segoe UI','sans-serif'];
githubTheme.bodyFontFamily= ['Roboto', 'sans-serif'];
const typography = new Typography(githubTheme);

export default typography;
