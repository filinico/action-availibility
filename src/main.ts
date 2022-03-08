import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    core.info(`GITHUB workspace=${process.env.GITHUB_WORKSPACE}`)
    core.info(`GITHUB_EVENT_NAME=${process.env.GITHUB_EVENT_NAME}`)
    if (process.env.GITHUB_WORKSPACE === undefined) {
      throw new Error('GITHUB_WORKSPACE not defined.')
    }
    const githubToken = core.getInput('GITHUB_TOKEN', {required: true})
    const octokit = github.getOctokit(githubToken)
    const {
      repo: {repo, owner}
    } = github.context
    const {data: pulls} = await octokit.rest.pulls.list({
      owner,
      repo
    })
    core.info(`Amount of pull requests currently opened=${pulls.length}`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
