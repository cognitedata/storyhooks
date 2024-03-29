@Library('jenkins-helpers@v0.1.13') _

static final String REPO = "storyhooks"
static final String PR_COMMENT_MARKER = "[pr-server]\n"

def label = "${REPO}-${UUID.randomUUID().toString().substring(0, 5)}"
podTemplate(
  label: label,
  containers: [containerTemplate(name: 'node',
                                image: 'node:8',
                                envVars: [
                                  envVar(key: 'CI', value: 'true'),
                                  envVar(key: 'NODE_PATH', value: 'src/'),
                                  secretEnvVar(
                                    key: 'PR_CLIENT_ID',
                                    secretName: 'pr-server-api-tokens',
                                    secretKey: 'client_id'
                                  ),
                                  secretEnvVar(
                                    key: 'PR_CLIENT_SECRET',
                                    secretName: 'pr-server-api-tokens',
                                    secretKey: 'client_secret'
                                  ),
                                ],
                                resourceRequestCpu: '2000m',
                                resourceRequestMemory: '2500Mi',
                                resourceLimitCpu: '2000m',
                                resourceLimitMemory: '2500Mi',
                                ttyEnabled: true)
  ],
  envVars: [
    envVar(key: 'CHANGE_ID', value: env.CHANGE_ID),
  ],
  volumes: [
    secretVolume(secretName: 'npm-credentials',
                  mountPath: '/npm-credentials',
                  readOnly: true),
    secretVolume(secretName: 'cognite-cicd-ssh-dupe',
                  mountPath: '/cognite-cicd-ssh',
                  readOnly: true)
  ]) {
    properties([])
    node(label) {
    def gitCommit
    stage('Checkout code') {
      checkout(scm)
    }
    container('node') {
      stage('Install dependencies') {
        sh('cp /npm-credentials/npm-public-credentials.txt ~/.npmrc')
        // Yarn can fail sometimes, so let's just retry it a few times.
        retry(5) {
          sh('yarn')
        }
      }
      if (env.CHANGE_ID) {
        // This needs to follow the delete-pr.sh step because we don't want to
        // remove the comments if the teardown didn't succeed.
        stage('Remove GitHub comments') {
          pullRequest.comments.each({
            if (it.body.startsWith(PR_COMMENT_MARKER) && it.user == "cognite-cicd") {
              pullRequest.deleteComment(it.id)
            }
          })
        }
      }
      stage('Check linting') {
        sh('yarn lint');
      }
      stage('Execute tests') {
        sh('yarn test');
      }
      stage('Build package') {
        sh('yarn build')
      }
      stage('Build storybook') {
        sh("yarn build-storybook")
        sh("tar -zcvf storybook.tar.gz storybook-static/*")
      }
      stage('Deploy storybook') {
        sh("yarn add --dev @cognite/release-manager")
        sh("yarn cognite-release-manager deploy-storybook -z storybook.tar.gz --output=storybook.md --repo storyhooks")
        // If the autodeploy dropped a storybook.md file, then it should be posted
        // as a comment on GitHub.
        if (fileExists('storybook.md')) {
          stage('Comment on GitHub (Storybook)') {
            markdown = readFile('storybook.md')
            pullRequest.comment("${PR_COMMENT_MARKER}${markdown}")
          }
        }
      }
      if (env.BRANCH_NAME == 'master') {
        stage('Publish to npm') {
          sh("yarn add --dev @cognite/release-manager")
          sh('yarn cognite-release-manager publish-module')
        }
      }
    }
  }
}
