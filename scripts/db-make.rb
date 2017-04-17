require 'pg'
require 'json'
env = ENV['NODE_ENV']
if env.nil?
  env = 'development'
end
configfile = File.read("#{__dir__}/../config/dbconfig.json")
config = JSON.parse(configfile)
dbconfig = config["#{env}"]

dbConnection = PG.connect(dbname: 'postgres')
dbConnection.exec("CREATE DATABASE #{dbconfig["database"]}")
dbConnection.exec("CREATE USER #{dbconfig["username"]} WITH PASSWORD '#{dbconfig["password"]}'")
dbConnection.exec("GRANT ALL PRIVILEGES ON #{dbconfig["database"]} TO #{dbconfig["username"]}")