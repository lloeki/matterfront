# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|

  # use basic ubuntu/trusty64 as base box
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "matterfront"

  # configure network for private mattermost instance
  # to be accessed from the host machine by hitting http://192.168.33.33
  # or on any networked machine by accessing
  # your host machine's IP on port 8065 (http://localhost:8065)
  config.vm.network "forwarded_port", guest: 80, host: 8065
  config.vm.network "private_network", ip: "192.168.33.33"


  # set up virtualbox configurations for this vm
  config.vm.provider "virtualbox" do |vb|
    vb.cpus = 2
	vb.name = "mattermost-dev"
	vb.memory = "2048"
  end

  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
  SHELL

  # configure vm to start a docker mattermost image
  # accessible on private ip from the host
  config.vm.provision "docker" do |d|
    d.images = ["mattermost/platform:dev"]
	d.run "mattermost-dev",
	  image: "mattermost/platform:dev",
	  daemonize: true,
	  args: "--publish 80:80"
  end
end
