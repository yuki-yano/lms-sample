namespace :db do
  namespace :ridgepole do
    desc 'Apply database schema'
    task migrate: :environment do
      options = ['--apply']
      ridgepole(options)
      Rake::Task['db:schema:dump'].invoke
    end

    desc 'Dry-run database schema'
    task dryrun: :environment do
      options = ['--apply', '--dry-run']
      ridgepole(options)
    end

    private

    def schema_file
      Rails.root.join('db', 'migrate', 'index.rb')
    end

    def config_file
      Rails.root.join('config', 'database.yml')
    end

    def ridgepole(options)
      command = ['bundle exec ridgepole', "--file #{schema_file}", "--config #{config_file}", "--env #{Rails.env}"]
      system((command + options).join(' '))
    end
  end
end
