require 'rack-rewrite'

root=File.join(Dir.pwd, 'public')
run Rack::Builder.new {
  use Rack::Rewrite do
    r302 '/', '/public/html/index.html' 
  end

  map '/public' do
    run Rack::Directory.new(root)
  end
}

